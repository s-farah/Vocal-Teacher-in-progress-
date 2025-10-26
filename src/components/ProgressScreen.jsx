import React, { useState, useEffect } from 'react';
import { Home, BarChart, Target, Music } from 'lucide-react';

function ProgressScreeen({ setScreen }) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
    const saved = localStorage.getItem('vocalCoachSessions');
    if (saved) {
        setSessions(JSON.parse(saved));
    }
    }, []);

    const avgAccuracy = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s ) => sum + s.accuracy, 0) / sessions.length)
    : 0;

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setScreen('home')}
            className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-medium"
          >
            <Home size={20} />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-blue-900">Your Progress</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="text-blue-500" size={24} />
              <h3 className="font-semibold text-blue-800">Total Sessions</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{sessions.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-yellow-500" size={24} />
              <h3 className="font-semibold text-blue-800">Avg Accuracy</h3>
            </div>
            <p className="text-4xl font-bold text-yellow-600">{avgAccuracy}%</p>
          </div>
        </div>

        {/* logs */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-blue-900 mb-4">Recent Sessions</h3>
          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session, i) => (
                <div key={i} className="bg-blue-50 rounded-xl p-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{new Date(session.date).toLocaleDateString()}</p>
                    <p className="text-sm text-blue-800">{session.focusArea}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{session.accuracy}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Music className="mx-auto text-blue-200 mb-4" size={48} />
              <p className="text-blue-400">No sessions yet. Start your first lesson!</p>
            </div>
          )}
        </div>

        {/*New Session (Button)*/}
        <div className="mt-8 text-center">
          <button
            onClick={() => setScreen('session')}
            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-yellow-400 hover:from-blue-500 hover:to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105"
          >
            Start New Session
          </button>
        </div>

      </div>
    </div>
  );
}