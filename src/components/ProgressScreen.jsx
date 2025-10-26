import React, { useState, useEffect } from 'react';
import { Home, BarChart3, Target, Music } from 'lucide-react';
import { loadSessions } from '../servcies/storageService';

function ProgressScreeen({ setScreen }) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        setSessions(loadSessions());
    }, []);

    const avgAccuracy = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s ) => sum + s.accuracy, 0) / sessions.length)
    : 0;

    return (
    <div className="progress-screen">
      <div className="progress-container">

        {/* Header */}
        <div className="progress-header">
          <button onClick={() => setScreen('home')}
            className="back-btn"
          >
            <Home size={20} />
            Back to Home
          </button>
          <h1 className="progress-title">Your Progress</h1>
          <div style={{ width: '100px' }}></div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <BarChart3 size={24} color="#a855f7"/>
              <h3 className="stat-label">Total Sessions</h3>
            </div>
            <p className="stat-value">{sessions.length}</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <Target size={24} color="#10b981" />
              <h3 className="stat-label">Avg Accuracy</h3>
            </div>
            <p className="stat-value green">{avgAccuracy}%</p>
          </div>
        </div>

        {/* logs */}
        <div className="session-history">
          <h3 className="card-title">Recent Sessions</h3>
          {sessions.length > 0 ? (
            <div className="session-list">
              {sessions.slice(0, 5).map((session, i) => (
                <div key={i} className="session-item">
                  <div className="session-info">
                    <h4>{new Date(session.date).toLocaleDateString()}</h4>
                    <p>{session.focusArea}</p>
                  </div>
                  <div className="session-accuracy">
                    <p className="accuracy-value">{session.accuracy}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Music className="empty-icon" size={48} />
              <p className="empty-text">No sessions yet. Start your first lesson!</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="action-center">
          <button onClick={() => setScreen('session')} className="action-btn">
            Start New Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgressScreen;