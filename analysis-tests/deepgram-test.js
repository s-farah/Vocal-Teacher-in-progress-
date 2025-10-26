import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
if (!DEEPGRAM_API_KEY) {
  console.error("Missing DEEPGRAM_API_KEY in .env file.");
  process.exit(1);
}

const AUDIO_PATH = "./test-voice.mp3";

async function analyzeAudio() {
  const audio = fs.readFileSync(AUDIO_PATH);

  const res = await fetch(
    "https://api.deepgram.com/v1/listen?model=audio-intelligence&features=pitch,loudness",
    {
        method: "POST",
        headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        "Content-Type": "audio/mp3",
        },
        body: audio,
    }
);


  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

analyzeAudio();
