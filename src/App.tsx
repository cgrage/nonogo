import React, { createRef, useState } from 'react';
import Board, { BoardRef } from './components/Board';
import AppMenu, { AppSettings } from './components/AppMenu';
import './App.css';

const App: React.FC = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [appSettings, setAppSettings] = useState<AppSettings>({ showSums: false });
    const boardRef = createRef<BoardRef>()

    return (
        <div className="app">
            <Board
                showSums={appSettings.showSums}
                onOpenMenu={() => setShowMenu(true)}
                ref={boardRef} />
            <AppMenu
                isVisible={showMenu}
                onClose={() => setShowMenu(false)}
                settings={appSettings}
                onSettingsChange={(newVals) => setAppSettings(newVals)}
                onGiveHint={() => boardRef.current?.giveHint()}
                onReset={() => boardRef.current?.reset()} />
        </div>
    );
}

export default App;
