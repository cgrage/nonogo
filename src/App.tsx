import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import AppMenu, { AppSettings } from './components/AppMenu';

function App() {

    const [showMenu, setShowMenu] = useState<boolean>(true);
    const [appSettings, setAppSettings] = useState<AppSettings>({ showSums: false });

    return (
        <div className="app">
            <Board
                showSums={appSettings.showSums}
                onOpenMenu={() => setShowMenu(true)} />
            <AppMenu
                isVisible={showMenu}
                onClose={() => setShowMenu(false)}
                settings={appSettings}
                onSettingsChange={(newVals) => setAppSettings(newVals)}
                onGiveHint={() => { }} />
        </div>
    );
}

export default App;
