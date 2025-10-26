import React from "react";
import { Music, Sparkles, TrendingUp } from 'lucide-react'

function HomeScreen ({setScreen}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-lg rounded-full p-6">
            <Music className="text-blue-600" size={64} />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-blue-900 mb-4">AI Vocal Coach</h1>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => setScreen('session')}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 text-xl"
          >
            <Sparkles size={28} />
            Start Lesson
          </button>

          <button
            onClick={() => setScreen('progress')}
            className="w-full bg-blue-400/30 hover:bg-blue-400/40 backdrop-blur-lg text-blue-900 font-semibold py-5 px-8 rounded-2xl border-2 border-blue-200/30 transition-all flex items-center justify-center gap-3"
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