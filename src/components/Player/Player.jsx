import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [ name, setName ] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function handleEditClick() {
        setIsEditing(editing => !editing);

        if (isEditing) {
            onChangeName(symbol, name);
        }
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    let playerName = '';
    let buttonText = isEditing ? 'Save' : 'Edit';

    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChange} />;
    } else {
        playerName = <span className="player-name">{name}</span>;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonText}</button>
        </li>
    );
}