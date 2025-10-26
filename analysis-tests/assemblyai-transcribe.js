import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const AAI_KEY = process.env.ASSEMBLYAI_API_KEY;
if (!AAI_KEY) throw new Error("Set ASSEMBLYAI_API_KEY in .env");

const AAI_BASE = "https://api.assemblyai.com/v2";

async function aaiUploadLocalFile(localPath) {
  const buf = fs.readFileSync(localPath);
  const res = await fetch(`${AAI_BASE}/upload`, {
    method: "POST",
    headers: { authorization: AAI_KEY, "transfer-encoding": "chunked" },
    body: buf,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
  const { upload_url } = await res.json();
  return upload_url; 
}

async function aaiStartTranscript(audioUrl) {
  const body = {
    audio_url: audioUrl,
    punctuate: true,
    format_text: true,

  };
  const res = await fetch(`${AAI_BASE}/transcript`, {
    method: "POST",
    headers: { authorization: AAI_KEY, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Start transcript failed: ${res.status} ${await res.text()}`);
  return res.json(); 
}

async function aaiPollTranscript(id, timeoutMs = 180000) {
  const started = Date.now();
  while (true) {
    const res = await fetch(`${AAI_BASE}/transcript/${id}`, {
      headers: { authorization: AAI_KEY },
    });
    if (!res.ok) throw new Error(`Poll failed: ${res.status} ${await res.text()}`);
    const json = await res.json();
    if (json.status === "completed") return json;
    if (json.status === "error") throw new Error(json.error);
    if (Date.now() - started > timeoutMs) throw new Error("Timeout");
    await new Promise(r => setTimeout(r, 2000));
  }
}

async function main() {
  const local = "./test-voice.wav"; // 16k mono wav
  const audioUrl = await aaiUploadLocalFile(local);
  const { id } = await aaiStartTranscript(audioUrl);
  const done = await aaiPollTranscript(id);

  console.log(JSON.stringify({
    text: done.text,
    word_count: done.words?.length ?? 0,
    first_words: done.words?.slice(0, 5) ?? [],
  }, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
