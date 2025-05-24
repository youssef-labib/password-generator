import React, { useState } from 'react';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [length, setLength] = useState(12);
    const [settings, setSettings] = useState({
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
    });

    const chars = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const generatePassword = () => {
        let character = '';
        
        if (settings.lowercase) character += chars.lowercase;
        if (settings.uppercase) character += chars.uppercase;
        if (settings.numbers) character += chars.numbers;
        if (settings.symbols) character += chars.symbols;

        if (character === '') {
            character = chars.lowercase;
            setSettings(prev => ({ ...prev, lowercase: true }));
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * character.length);
            newPassword += character[randomIndex];
        }

        setPassword(newPassword);
    };

    const handleSettingChange = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    React.useEffect(() => {
        generatePassword();
    }, [length, settings]);

    return (
        <div className="min-w-screen min-h-screen bg-gray-800 flex items-center justify-center px-5 py-5">
            <div className="w-full mx-auto rounded-lg bg-white shadow p-5 text-gray-800" style={{ maxWidth: '500px' }}>
                <div className="relative mb-2">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Password"
                        readOnly
                    />
                    <button
                        className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 mb-2">
                        PASSWORD LENGTH: {length}
                    </label>
                    <input
                        type="range"
                        className="w-full"
                        min="4"
                        max="30"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={settings.lowercase}
                            onChange={() => handleSettingChange('lowercase')}
                            className="form-checkbox"
                        />
                        <span className="text-sm">Lowercase</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={settings.uppercase}
                            onChange={() => handleSettingChange('uppercase')}
                            className="form-checkbox"
                        />
                        <span className="text-sm">Uppercase</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={settings.numbers}
                            onChange={() => handleSettingChange('numbers')}
                            className="form-checkbox"
                        />
                        <span className="text-sm">Numbers</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={settings.symbols}
                            onChange={() => handleSettingChange('symbols')}
                            className="form-checkbox"
                        />
                        <span className="text-sm">Symbols</span>
                    </label>
                </div>

                <button
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    onClick={generatePassword}
                >
                    Generate New Password
                </button>
            </div>
        </div>
    );
};

export default PasswordGenerator;