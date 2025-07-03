## Foundation Structure

We’ll start with a flexible React component that accepts `text`, `textColor` and `duplicateText` as props. We also register the GSAP plugin `SplitText`, which we'll use for character-based animations.

```jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import "./TextStagger.css";

gsap.registerPlugin(SplitText);

export default function TextStagger({ text, textColor, duplicateText = text, className }) {
  return (
    <div className={`text-wrapper ${className}`}>
      {/* We will build out the layout and animation soon */}
    </div>
  );
}
```

---

- `duplicateText = text` means if you don't pass the `duplicateText` prop, it will default to using the same `text`.
- We import `SplitText` to split the text into individual characters for fine-grained animation control.

---

## Layout & Refs Setup

Next, we’ll define the DOM structure and connect our spans to React refs so GSAP can animate them.

```jsx
const spanRef = useRef(null);
const duplicateSpanRef = useRef(null);
const textCharsRef = useRef([]);
const duplicateCharsRef = useRef([]);

useEffect(() => {
  if (spanRef.current && duplicateSpanRef.current) {
    const split1 = new SplitText(spanRef.current, {
      type: "chars",
      charsClass: "char",
    });

    const split2 = new SplitText(duplicateSpanRef.current, {
      type: "chars",
      charsClass: "char-dup",
    });

    textCharsRef.current = split1.chars;
    duplicateCharsRef.current = split2.chars;
  }
}, []);
```

---

## Animation Logic

We now define the animation behavior that runs when you hover over the text.

```jsx
const slideUp = () => {
  const height = spanRef.current.offsetHeight + 10;

  gsap.to(textCharsRef.current, {
    y: -height,
    stagger: 0.05,
    duration: 0.5,
    ease: "power3.out",
  });

  gsap.to(duplicateCharsRef.current, {
    y: -height,
    stagger: 0.05,
    duration: 0.5,
    ease: "power3.out",
  });
};

const slideDown = () => {
  gsap.to(textCharsRef.current, {
    y: 0,
    stagger: 0.05,
    duration: 0.5,
    ease: "power3.out",
  });

  gsap.to(duplicateCharsRef.current, {
    y: 0,
    stagger: 0.05,
    duration: 0.5,
    ease: "power3.out",
  });
};
```

---

## Final Component Structure

Let’s complete the component by combining layout, refs, and event handlers.

```jsx
return (
  <div className={`text-wrapper ${className}`}>
    <span onMouseEnter={slideUp} onMouseLeave={slideDown} className="resdsx">
      <div className="text">
        <span style={{ color: textColor }} ref={spanRef}>
          {text}
        </span>
      </div>
      <div className="text-duplicate">
        <span style={{ color: textColor }} ref={duplicateSpanRef}>
          {duplicateText}
        </span>
      </div>
    </span>
  </div>
);
```

---

## CSS Styling

These styles make sure characters animate smoothly and only one line is visible at a time.

```css
@font-face {
  font-family: "Ligsans";
  src: url("https://ywerf4fo8udqtrne.public.blob.vercel-storage.com/LigaSans-Bold-fc2ZTym6FP7foHgBmaDmNPCpEYCNwp.otf");
}

.resdsx {
  display: flex;
  position: relative;
  overflow: hidden;
  font-family: "Nohemi", sans-serif;
  font-size: 3vw;
  line-height: 1;
  height: 1em;
  cursor: pointer;
  width: fit-content;
  flex-direction: column;
  gap: 10px;
}

.text,
.text-duplicate {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  will-change: transform;
}

.char,
.char-dup {
  display: inline-block;
}
```

---

## Usage Example

Here’s how you would use this component inside any React project:

```jsx
<TextStagger text="Hover Me" textColor="black" />
```

You can also provide a completely different `duplicateText` to create a text-swap animation effect.

```jsx
<TextStagger text="Hover Me" duplicateText="Let's Go!" textColor="#FF5733" />
```

---

## Final Working Code

```codegroup
// TextStagger.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import "./TextStagger.css";

gsap.registerPlugin(SplitText);

export default function TextStagger({ text, textColor, duplicateText = text, className }) {
    const spanRef = useRef(null);
    const duplicateSpanRef = useRef(null);
    const textCharsRef = useRef([]);
    const duplicateCharsRef = useRef([]);

    useEffect(() => {
        if (spanRef.current && duplicateSpanRef.current) {
            const split1 = new SplitText(spanRef.current, {
                type: "chars",
                charsClass: "char"
            });

            const split2 = new SplitText(duplicateSpanRef.current, {
                type: "chars",
                charsClass: "char-dup"
            });

            textCharsRef.current = split1.chars;
            duplicateCharsRef.current = split2.chars;
        }
    }, []);

    const slideUp = () => {
        const height = (spanRef.current.offsetHeight + 10);

        gsap.to(textCharsRef.current, {
            y: -height,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(duplicateCharsRef.current, {
            y: -height,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });
    };

    const slideDown = () => {
        gsap.to(textCharsRef.current, {
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(duplicateCharsRef.current, {
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });
    };



    return (
        <div className={`text-wrapper ${className}`}>
            <span
                onMouseEnter={slideUp}
                onMouseLeave={slideDown}
                className="resdsx"
            >
                <div className="text">
                    <span style={{ color: textColor }} ref={spanRef}>{text}</span>
                </div>
                <div className="text-duplicate">
                    <span style={{ color: textColor }} ref={duplicateSpanRef}>{duplicateText}</span>
                </div>
            </span>
        </div>
    );
}


// TextStagger.css
@font-face {
  font-family: "Ligsans";
  src: url("https://ywerf4fo8udqtrne.public.blob.vercel-storage.com/LigaSans-Bold-fc2ZTym6FP7foHgBmaDmNPCpEYCNwp.otf");
}

.resdsx {
  display: flex;
  position: relative;
  overflow: hidden;
  font-family: "Nohemi", sans-serif;
  font-size: 3vw;
  line-height: 1;
  height: 1em;
  cursor: pointer;
  width: fit-content;
  flex-direction: column;
  gap: 10px;
}

.text,
.text-duplicate {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  will-change: transform;
}

.char,
.char-dup {
  display: inline-block;
}
```

---

## Do you think something is missing in this tutorial?

Send me an email at [mohit@craftedbylunar.xyz](mailto:mohit@craftedbylunar.xyz)

---

## And That’s It!

```footer

```
