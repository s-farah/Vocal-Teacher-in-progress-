import React, { useState } from 'react';
import { Home, Mic, Square } from 'lucide-react';

function SessionScreen({ setScreen }) {
    const [isRecording, setIsRecording] = useState(false);
    const [feedback, setFeedback] = useState('');

    const toffleRecording =() => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setFeedback('Recording started!')
        } else {
            setFeedback('Recording STOPPED')
        }
    };

    return ( 
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setScreen('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            <Home size={20} />
            Back to Home
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Practice Session</h2>
          <div className="w-24"></div>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <button
                onClick={toggleRecording}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl ${
                  isRecording
                    ? 'bg-yellow-400 hover:bg-yellow-500 animate-pulse'
                    : 'bg-gradient-to-br from-blue-400 to-yellow-300'
                }`}
              >
                {isRecording ? <Square className="text-white" size={48} /> : <Mic className="text-white" size={48} />}
              </button>
              <p className="mt-4 text-lg font-medium text-gray-700">
                {isRecording ? 'Recording... Click to Stop' : 'Click to Start Recording'}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-3">AI Feedback</h3>
              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-4 min-h-32">
                {feedback ? (
                  <p className="text-gray-700">{feedback}</p>
                ) : (
                  <p className="text-gray-400 italic">Start recording to receive feedback...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionScreen;