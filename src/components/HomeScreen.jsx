import React from "react";
import { Music, Sparkles, TrendingUp } from 'lucide-react'

function HomeScreen ({ setScreen }) {
  return (
    <div className="home-screen">
      <div className="home-content">
        <div className="home-icon">
            <Music size={64} color="white" />
        </div>

        <h1 className="home-title">AI Vocal Coach</h1>

        {/* Buttons */}
        <div className="button-group">
          <button
            onClick={() => setScreen('session')}
            className="btn btn-primary"
            style={{
              background: 'white',
              color: '#7c3aed'
            }}
          >
            <Sparkles size={28} />
            Start Lesson
          </button>

          <button
            onClick={() => setScreen('progress')}
            className="btn btn-secondary"
          >
            <TrendingUp size={24} />
            View Progress
          </button>

        </div>

      </div>
    </div>
  );
}

export default HomeScreen;