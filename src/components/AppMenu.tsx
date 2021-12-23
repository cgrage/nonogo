import React from 'react';
import Switch from 'react-switch';

export type AppSettings = {
    showSums: boolean;
}

interface SettingsProps {
    isVisible: boolean;
    settings: AppSettings;
    onClose: () => void;
    onSettingsChange: (newSettings: AppSettings) => void;
    onGiveHint: () => void;
}

const SettingsPage: React.FC<SettingsProps> = (props) => {
    return <>
        <div className={props.isVisible ? "overlay" : "hide"} onClick={() => props.onClose()}></div>
        <div className={props.isVisible ? "modal" : "hide"}>
            <h1>Modal heading</h1>
            <div>
                <Switch checked={props.settings.showSums}
                    onChange={(e) => { props.onSettingsChange({ ...props.settings, showSums: e }) }} />
            </div>
            <div><button onClick={() => {
                props.onGiveHint();
                props.onClose();
            }}>Give Hint</button></div>
            <div><button onClick={() => props.onClose()}>Close</button></div>
        </div>
    </>
}

export default SettingsPage