import React, { useState, useEffect} from 'react';
import { Home, Mic, Square, Music, Play, Pause, Volume2, Activity, Award } from 'lucide-react';
import { startRecording, stopRecording } from '../services/audioService';
import { saveSession } from '../services/storageService';
import { frequencyToNote } from '../utils/noteConverter';

function SessionScreen({ setScreen }) {
    const [isRecording, setIsRecording] = useState(false);
    const [isDemoPlaying, setIsDemoPlaying] = useState(false);

    const [feedback, setFeedback] = useState('');
    const [pitchData, setPitchData] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [sessionTime, setSessionTime] = useState(0);
    const [sessionProgress, setSessionProgress] = useState(0);
    const [encouragement, setEncouragement] = useState('');
    const [showEncouragement, setShowEncouragement] = useState(false);
    
    const SESSION_DURATION = 60;

      // Simulate pitch detection when recording
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        const freq = 200 + Math.random() * 400;
        setPitchData(prev => [...prev.slice(-30), freq]);
        setCurrentNote(frequencyToNote(freq));
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  // Session timer
  useEffect(() => {
    if (isRecording) {
      const timer = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          setSessionProgress((newTime / SESSION_DURATION) * 100);
          
          // Show encouragement every 15 seconds
          if (newTime % 15 === 0 && newTime > 0) {
            showEncouragementPopup();
          }
          
          // Auto end session
          if (newTime >= SESSION_DURATION) {
            endSession();
          }
          
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isRecording]);

  const playDemo = () => {
    setIsDemoPlaying(true);
    console.log('Playing demo audio...');
    setTimeout(() => setIsDemoPlaying(false), 3000);
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      const success = await startRecording((audioBlob) => {
        console.log('Got audio:', audioBlob);
        setFeedback('Listening... analyzing your pitch...');
      });
      
      if (success) {
        setIsRecording(true);
        setSessionTime(0);
        setSessionProgress(0);
      }
    } else {
      stopRecording();
      setIsRecording(false);
    }
  };

  const showEncouragementPopup = () => {
    const messages = ['Great job! 🎵', 'Excellent! ⭐', 'Keep going!', 'Nice! 👏'];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    setEncouragement(msg);
    setShowEncouragement(true);
    setTimeout(() => setShowEncouragement(false), 2030);//
  };

  const endSession = () => {
    const sessionData = {
      date: new Date().toISOString(),
      accuracy: 75 + Math.floor(Math.random() * 20),
      focusArea: 'pitch accuracy',
      duration: sessionTime
    };
    
    saveSession(sessionData);
    alert('Session saved! Check your progress.');
    stopRecording();
    setIsRecording(false);
  };

  return (
    <div className="session-screen">
      <div className="session-container">
        {/* Header */}
        <div className="session-header">
          <button onClick={() => setScreen('home')} className="back-btn">
            <Home size={20} />
            Back to Home
          </button>
          <h2 className="session-title">Practice Session</h2>
          <div style={{ width: '100px' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-info">
            <span>Session Progress</span>
            <span>{sessionTime}s / {SESSION_DURATION}s</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${sessionProgress}%` }}></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="session-grid">
          {/* Left Column */}
          <div>
            {/* Demo Player */}
            <div className="card">
              <h3 className="card-title">
                <Music size={20} />
                Reference Demo
              </h3>
              <div className="demo-controls">
                <button onClick={playDemo} disabled={isDemoPlaying} className="demo-btn">
                  {isDemoPlaying ? <Pause size={20} /> : <Play size={20} />}
                  {isDemoPlaying ? 'Playing...' : 'Play Demo'}
                </button>
                {isDemoPlaying && (
                  <div className="waveform">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="wave-bar"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pitch Visualizer */}
            <div className="card">
              <h3 className="card-title">
                <Activity size={20} />
                Live Pitch Tracker
              </h3>
              <div className="pitch-visualizer">
                {currentNote && (
                  <div className="current-note">{currentNote}</div>
                )}
                <svg width="100%" height="100%">
                  <polyline
                    points={pitchData.map((freq, i) => 
                      `${(i / Math.max(pitchData.length - 1, 1)) * 100}%,${100 - (freq / 600) * 80}%`
                    ).join(' ')}
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                {pitchData.length === 0 && (
                  <div className="pitch-placeholder">
                    Start singing to see your pitch...
                  </div>
                )}
              </div>
            </div>

            {/* Microphone */}
            <div className="card">
              <div className="mic-container">
                <button
                  onClick={toggleRecording}
                  className={`mic-button ${isRecording ? 'recording' : ''}`}
                >
                  {isRecording ? <Square size={48} /> : <Mic size={48} />}
                </button>
                <p className="mic-text">
                  {isRecording ? 'Recording... Click to Stop' : 'Click to Start Recording'}
                </p>
                {isRecording && (
                  <button onClick={endSession} className="end-session-btn">
                    End Session
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Feedback */}
          <div>
            <div className="card">
              <h3 className="card-title">
                <Award size={20} />
                AI Feedback
              </h3>
              <div className="feedback-box">
                {feedback ? (
                  <p className="feedback-text">{feedback}</p>
                ) : (
                  <p className="feedback-placeholder">Start recording to receive feedback...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Popup */}
        {showEncouragement && (
          <div className="encouragement-popup">
            <p className="encouragement-text">{encouragement}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionScreen;