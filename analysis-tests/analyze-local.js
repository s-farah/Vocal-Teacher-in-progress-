import fs from "fs";
import { decode } from "wav-decoder";
import Pitchfinder from "pitchfinder";
import Meyda from "meyda";

export async function analyzePitchLoudness(wavPath) {
  const buf = fs.readFileSync(wavPath);
  const { sampleRate, channelData } = await decode(buf);
  const mono = channelData.length === 1 ? channelData[0] : channelData[0]; 

  const detectPitch = Pitchfinder.YIN({ sampleRate });
  const hop = 1024;                      
  const dt = hop / sampleRate;           
  const f0 = [];
  const rms = [];
  for (let i = 0; i + hop <= mono.length; i += hop) {
    const frame = mono.subarray(i, i + hop);
    f0.push(detectPitch(frame) || 0);
    rms.push(Meyda.extract("rms", frame));
  }
  const stability = coeffVar(f0.filter(x => x > 0));
  return { f0, rms, dt, stability };
}

function coeffVar(arr){ if(!arr.length) return 0; const m=arr.reduce((a,b)=>a+b,0)/arr.length; if(m===0) return 0; const v=arr.reduce((s,x)=>s+(x-m)**2,0)/arr.length; return Math.sqrt(v)/m; }
