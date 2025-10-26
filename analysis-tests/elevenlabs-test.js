import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
if (!ELEVENLABS_API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY in .env file.");
  process.exit(1);
}


const FEMALE_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel


async function saveAudio(buffer, filename) {
  fs.writeFileSync(filename, Buffer.from(buffer));
  console.log(`Saved ${filename}`);
}

// test 1: talk
async function testSpeaking() {
  console.log("\nTEST 1: Pure speaking warm-up...");

  const text = `
  Welcome to your warm-up session.
  Take a deep breath in, and let your shoulders relax.
  We'll start with a gentle five-note scale. Listen to my example, then repeat after me.
  Remember: stay light, stay relaxed, and focus on breath support.
  Speak clearly, with a calm and encouraging tone, at a slightly slower pace (about five percent slower than normal conversation) so learners can follow comfortably.
  `;

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${FEMALE_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        accept: "audio/mpeg",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model_id: "eleven_multilingual_v2",
        text: text.trim(),
        voice_settings: {
          stability: 0.8,
          similarity_boost: 0.9,
          style: 0.55,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!res.ok) {
    console.error("Error:", res.status, await res.text());
    return;
  }

  const buf = await res.arrayBuffer();
  await saveAudio(buf, "test1_speaking.mp3");
}

// test 2: sing
async function testSinging() {
  console.log("\nTEST 2: Pure singing - natural human tone...");

  const prompt = `
A single female vocal coach singing one smooth, natural five-note vocal warm-up on the syllable “mah.”
Exact pitches: A3, B3, C#4, D4, E4 ascending, then D4, C#4, B3, A3 descending.
Style: relaxed mezzo-soprano, clear tone, light legato phrasing, steady breath support.
Tempo: approximately 80 BPM, one note per beat, even rhythm.
Maintain a natural human resonance, subtle breathing between phrases, no vibrato.
A cappella, dry studio recording, no instruments or reverb.
Total duration: about nine seconds.
  `.trim();

  const res = await fetch("https://api.elevenlabs.io/v1/music/stream", {
    method: "POST",
    headers: {
      "xi-api-key": ELEVENLABS_API_KEY,
      accept: "audio/mpeg",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      duration_seconds: 9,
      audio_format: "mp3_44100_128",
    }),
  });

  if (!res.ok) {
    console.error("Error:", res.status, await res.text());
    return;
  }

  const buf = await res.arrayBuffer();
  await saveAudio(buf, "test2_singing.mp3");
}

// test 3: talk, sing, talk
async function testMixed() {
  console.log("\nTEST 3: Mixed conversational - talk, sing, talk...");

  const prompt = `
A warm, expressive female vocal coach teaching a student. 
Same voice and identity throughout — the same woman speaking and singing.

(0:00–0:03) SPEAKING: Naturally says, at a calm, slightly slower pace:
"Let's warm up together. We'll use a five-note scale on 'mah.'"

(0:04–0:11) SINGING: Smoothly sings:
A3, B3, C#4, D4, E4, D4, C#4, B3, A3.
Maintain even rhythm, breath support, and legato phrasing.

(0:12–0:15) SPEAKING: Continues naturally:
"Good! Now you try it — keep your tone steady and light."

Make transitions between speech and singing seamless and believable, like a real voice teacher giving a live demonstration.
Use one consistent mezzo-soprano voice, a cappella, dry studio sound, no reverb.
Total duration: about fifteen seconds.
  `.trim();

  const res = await fetch("https://api.elevenlabs.io/v1/music/stream", {
    method: "POST",
    headers: {
      "xi-api-key": ELEVENLABS_API_KEY,
      accept: "audio/mpeg",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      duration_seconds: 15,
      audio_format: "mp3_44100_128",
    }),
  });

  if (!res.ok) {
    console.error("Error:", res.status, await res.text());
    return;
  }

  const buf = await res.arrayBuffer();
  await saveAudio(buf, "test3_mixed.mp3");
}

// main
const mode = process.argv[2];

console.log("ElevenLabs Vocal Coach Tests (Natural Tone Mode)");
console.log("=================================================\n");

if (mode === "speak" || mode === "1") {
  await testSpeaking();
} else if (mode === "sing" || mode === "2") {
  await testSinging();
} else if (mode === "mix" || mode === "3") {
  await testMixed();
} else if (mode === "all") {
  await testSpeaking();
  await testSinging();
  await testMixed();
} else {
  console.log("Usage:");
  console.log("  node elevenlabs-test.js speak   (or 1)");
  console.log("  node elevenlabs-test.js sing    (or 2)");
  console.log("  node elevenlabs-test.js mix     (or 3)");
  console.log("  node elevenlabs-test.js all");
}

console.log("\nDone.");
