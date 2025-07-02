## Coming soon!

A detailed tutorial for this component is on the way! In the meantime, feel free to explore and use the code below.

---

```codegroup

// ScrambleText.jsx
import React, { useRef } from "react";
import "./TextScramble.css";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function TextScramble({ text, color = "#fff" }) {
    const textRef = useRef(null);

    const playScramble = () => {
        gsap.to(textRef.current, {
            duration: 0.6,
            scrambleText: {
                text: text,
                chars: "!@#$%^&*",
                revealDelay: 0.1,
                tweenLength: false,
            },
            ease: "power1.inOut",
        });
    };

    return (
        <div
            className="text-scramble"
            onMouseEnter={playScramble}
        >
            <span ref={textRef} style={{ color }}>{text}</span>
        </div>
    );
}



// ScrambleText.css
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.text-scramble{
    font-size: 30px;
    cursor: pointer;
    width: fit-content;
    font-family: "Geist Mono";
    letter-spacing: -0.03em;
}
  
  
```

---

## Want to Contribute?

Are you a developer who enjoys sharing knowledge? We’d love your help writing a tutorial for this component! Visit our [GitHub repository](https://github.com/CraftedByLunar/platform) and become a contributor to the project.

---

```footer

```
