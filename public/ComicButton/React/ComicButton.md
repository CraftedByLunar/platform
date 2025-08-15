## Foundation Structure

We’ll start with a flexible React component that accepts a few props for customizing text and styles — perfect for reuse across different projects.

```js
import React, { useRef } from "react";
import gsap from "gsap";
import "./3DComicButton.css";

export default function ComicButton({
  onClick,
  text,
  borderColor,
  color,
  textColor,
  className,
}) {
  const buttonRef = useRef(null);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`button ${className}`}
      style={{
        "--border-color": borderColor,
        "--button-color": color,
        "--text-color": textColor,
      }}
    >
      {text}
    </button>
  );
}
```

---

- The component uses `useRef` to directly access the DOM node — needed for GSAP animations.
- Custom props allow you to easily style the button from the outside using CSS variables.

---

## CSS Foundation

The base styles define the button's look and set it up for motion.

```css
.button {
  --border-color: black;
  --button-color: white;
  --text-color: black;

  position: relative;
  display: inline-block;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-color);
  background-color: var(--button-color);
  border: 3px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  outline: none;
  font-family: "Satoshi";
  transform: rotateX(-20deg);
}
```

We’re using `rotateX(-20deg)` to give the button a subtle 3D tilt — it’s what gives it that comic-style pop.

---

## Adding Hover Animation

This runs when the user hovers over the button.

```js
const handleMouseEnter = () => {
  gsap.to(buttonRef.current, {
    duration: 0.1,
    y: -4,
    ease: "bounce.inOut",
    boxShadow: "0px 4px 0 var(--border-color)",
    overwrite: true,
  });
};
```

Here, we nudge the button upward (`y: -4`) and drop a shadow to make it look 3D. The `bounce.inOut` easing gives it a fun, responsive feel.

---

## Adding Mouse Leave Animation

This resets the hover effect.

```js
const handleMouseLeave = () => {
  gsap.to(buttonRef.current, {
    duration: 0.1,
    y: 0,
    ease: "bounce.inOut",
    boxShadow: "0px 0px 0 var(--border-color)",
    overwrite: true,
  });
};
```

It brings the button back to its neutral state with the shadow removed.

---

## Adding Active Animation

This happens when the user clicks (mousedown).

```js
const handleMouseDown = () => {
  gsap.to(buttonRef.current, {
    duration: 0.05,
    y: 4,
    ease: "bounce.inOut",
    boxShadow: "0px 2px 0 var(--border-color)",
    overwrite: true,
  });
};
```

Clicking presses the button downward slightly — a classic UI micro-interaction.

---

## Applying the Functions

Let’s wire up all the handlers inside the button:

```jsx
<button
  ref={buttonRef}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseEnter}
  onClick={onClick}
  className={`button ${className}`}
  style={{
    "--border-color": borderColor,
    "--button-color": color,
    "--text-color": textColor,
  }}
>
  {text}
</button>
```

We use `onMouseUp={handleMouseEnter}` to bring the button back into hover state after the click ends.

---

## Implementation Usage

Here’s how you’d use the button in a real component:

```jsx
<ComicButton
  text="Click Me!"
  onClick={() => alert("Hey!")}
  borderColor="black"
  color="white"
  textColor="black"
/>
```

All the props are optional — just tweak them to match your design.

---

## Final Working Code

```codegroup
// ComicButton.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import "./3DComicButton.css";

export default function ComicButton({ onClick, text, borderColor, color, textColor, className }) {

    const buttonRef = useRef(null)

    const handleMouseEnter = () => {
        gsap.to(buttonRef.current, {
            duration: 0.1,
            y: -4, // Pushes the button up
            ease: "bounce.inOut",
            boxShadow: "0px 4px 0 var(--border-color)", // Restores shadow
            overwrite: true
        });
    };

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
            duration: 0.1,
            y: 0, // Returns the button to its original position
            ease: "bounce.inOut",
            boxShadow: "0px 0px 0 var(--border-color)", // Removes shadow
            overwrite: true
        });
    };

    const handleMouseDown = () => {
        gsap.to(buttonRef.current, {
            duration: 0.05,
            y: 4, // Pushes the button down
            ease: "bounce.inOut",
            boxShadow: "0px 2px 0 var(--border-color)",
            overwrite: true
        });
    };

    const handleMouseUp = () => {
        handleMouseEnter(); // Return to hover state on mouse release
    };

    return (
        <button
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
            className={`button ${className}`}
            style={{
                "--border-color": borderColor,
                "--button-color": color,
                "--text-color": textColor,
            }}
        >
            {text}
        </button>
    );

}



// ComicButton.css
@font-face {
  font-family: "Liga Sans";
  src: url("https://ywerf4fo8udqtrne.public.blob.vercel-storage.com/LigaSans-Bold-fc2ZTym6FP7foHgBmaDmNPCpEYCNwp.otf");
}
@font-face {
  font-family: "Satoshi";
  src: url("https://ywerf4fo8udqtrne.public.blob.vercel-storage.com/Satoshi-Variable-NBxfOyXZyPII7zRzLJGOGbrn07LkfZ.ttf");
}

.button {
  --border-color: black;
  --button-color: white;
  --text-color: black;

  position: relative;
  display: inline-block;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-color);
  background-color: var(--button-color);
  border: 3px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  outline: none;
  font-family: "Satoshi";
  transform: rotateX(-20deg);
}
```

---

## Do you think something is missing in this tutorial?

Send me an email at [mohit@bylunar.dev](mailto:mohit@bylunar.dev)

---

## And with that, You did it!

```footer

```
