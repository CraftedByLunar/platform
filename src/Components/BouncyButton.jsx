import "./BouncyButton.css";

export default function BouncyButton({ text, background, textColor, className, onClick }) {
    return (
        <div className={`main-bouncy-btn ${className}`}>
            <button id="bouncy-btn" onClick={onClick} style={{ background, color: textColor }}>
                <span>{text}</span>
            </button>
        </div>
    );
}
