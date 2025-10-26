import { analyzePitchLoudness } from "./analyze-local.js";

async function runTest() {
  try {
    const result = await analyzePitchLoudness("./test-voice.wav");
    console.log("Local analysis success!\n");
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Local analysis failed:", err.message);
  }
}

runTest();
