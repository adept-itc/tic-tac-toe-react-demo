import './Header.css';
import GameLogo from '../../assets/game-logo.png';

export default function Header() {
    return (
        <header>
            <img src={GameLogo} alt="Hand-drawn tic-tac-toe game board" />
            <h1>Tic-Tac-Toe</h1>
        </header>
    );
}