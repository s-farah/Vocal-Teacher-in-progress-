import React, { useState } from "react";
import HomeScreen from './components/HomeScreen';
import SessionScreen from './components/SessionScreen';
import ProgressScreeen from './components/ProgressScreeen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <>
    {currentScreen === 'home' && <HomeScreen setScreen={setCurrentScreen} />}
    {currentScreen === 'session' && <SessionScreen setScreen={setCurrentScreen} />}
    {currentScreen === 'progress' && <ProgressScreeen setScreen={setCurrentScreen} />}
    </>
  );
}

export default App;

