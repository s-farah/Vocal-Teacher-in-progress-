let mediaRecorder = null;
let audioStream = null;

export async function startRecording(onAudioChunk) {
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(audioStream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log('Audio chunk:', event.data.size, 'bytes');
        onAudioChunk(event.data);
      }
    };
    
    mediaRecorder.start(1000);
    return true;
  } catch (error) {
    console.error('Microphone error:', error);
    alert('Please allow microphone access');
    return false;
  }
}

export function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
  }
}
