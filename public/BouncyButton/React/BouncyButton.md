## Coming soon!

A detailed tutorial for this component is on the way! In the meantime, feel free to explore and use the code below.

---

```codegroup

// BouncyButton.jsx
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



// BouncyButton.css
.main-bouncy-btn {
    width: fit-content;
}


.main-bouncy-btn button {
    padding: 10px 25px;
    font-family: "Satoshi";
    border-radius: 50px;
    border: 1px solid;
    cursor: pointer;
    transition: transform 0.5s linear(
        0, 0.2178 2.1%, 1.1144 8.49%,
        1.2959 10.7%, 1.3463 11.81%,
        1.3705 12.94%, 1.3726, 1.3643 14.48%,
        1.3151 16.2%, 1.0317 21.81%,
        0.941 24.01%, 0.8912 25.91%,
        0.8694 27.84%, 0.8698 29.21%,
        0.8824 30.71%, 1.0122 38.33%, 1.0357,
        1.046 42.71%, 1.0416 45.7%,
        0.9961 53.26%, 0.9839 57.54%,
        0.9853 60.71%, 1.0012 68.14%,
        1.0056 72.24%, 0.9981 86.66%, 1
      ); /* equivalent to GSAP's elastic easing */
    background: transparent;
    color: inherit;
}

#bouncy-btn span {
    display: inline-block;
    font-size: 15px;
    transition: transform 0.5s linear(
        0, 0.2178 2.1%, 1.1144 8.49%,
        1.2959 10.7%, 1.3463 11.81%,
        1.3705 12.94%, 1.3726, 1.3643 14.48%,
        1.3151 16.2%, 1.0317 21.81%,
        0.941 24.01%, 0.8912 25.91%,
        0.8694 27.84%, 0.8698 29.21%,
        0.8824 30.71%, 1.0122 38.33%, 1.0357,
        1.046 42.71%, 1.0416 45.7%,
        0.9961 53.26%, 0.9839 57.54%,
        0.9853 60.71%, 1.0012 68.14%,
        1.0056 72.24%, 0.9981 86.66%, 1
      );
}

.main-bouncy-btn:hover button,
.main-bouncy-btn:hover #bouncy-btn span {
    transform: scale(1.1);
}


  
```

---

## Want to Contribute?

Are you a developer who enjoys sharing knowledge? We’d love your help writing a tutorial for this component! Visit our [GitHub repository](https://github.com/CraftedByLunar/platform) and become a contributor to the project.

---

```footer

```
