export function frequencyToNote(frequency) {
    if (!frequency || frequency <= 0) return ''; 
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'B#'];
    const A4 = 440;

    const halfSteps = Math.round(12 * Math.log2(frequency / A4));
    const octave = Math.floor((halfSteps + 57) / 12);
    const noteIndex = (halfSteps + 57) % 12;

    return '${notes[noteIndex]}${octave}';
}