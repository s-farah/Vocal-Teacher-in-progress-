const STORAGE_KEY = 'vocalCoachSessions';

//save a new session
export function saveSession(sessionData) {
  try {
    const sessions = loadSessions();
    sessions.unshift(sessionData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(0, 20)));
    console.log('Session saved:', sessionData);
  } catch (error) {
    console.error('Save error:', error);
  }
}

//load all saved all sessions
export function loadSessions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Load error:', error);
    return [];
  }
}

export function clearAllSessions() {
  localStorage.removeItem(STORAGE_KEY);
}
