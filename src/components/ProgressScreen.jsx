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


}