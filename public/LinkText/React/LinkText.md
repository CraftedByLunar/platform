## Foundation Structure

We'll begin with a basic React component that accepts text and link destination as props, ensuring flexibility across different implementations.

```js
import React from "react";
import "./LinkText.css";

export default function LinkText({ text, to, className }) {
  return (
    // Component structure will be built incrementally
  );
}
```

The component uses three essential props:

- `text` defines the display content
- `to` specifies the link destination
- `className` for custom class names

---

## Main Layout

The link component consists of a simple but effective structure that enables precise animation control.

```jsx
export default function LinkText({ text, to }) {
  return (
    <div className={`linkText ${className}`}>
      <a href={to}>{text}</a>
      <div className="underline"></div>
    </div>
  );
}
```

This structure separates the clickable text from the animated underline element, allowing independent control over each component's behavior and styling.

---

## CSS Foundation

The base styling establishes the visual hierarchy and prepares the underline element for animation.

```css
.linkText {
  font-size: 33px;
  font-weight: 500;
  font-family: "Satoshi";
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.linkText a {
  color: black;
  text-decoration: none;
}

.underline {
  height: 1px;
  width: 100%;
  margin-top: -4px;
  background-color: black;
  position: relative;
  transform: translateX(-101%);
  will-change: transform;
}
```

Key styling decisions include:

- `overflow: hidden` on the container prevents the underline from showing during off-screen positioning
- `transform: translateX(-101%)` positions the underline completely off-screen to the left
- `will-change: transform` optimizes the element for frequent transform animations
- `position: relative` enables transform-based positioning

---

## GSAP Animation System

The animation system creates a smooth sliding effect using GSAP's transform capabilities and React's ref system for DOM targeting.

---

### Setup and Imports

```js
import gsap from "gsap";
import React, { useRef } from "react";
import "./LinkText.css";

export default function LinkText({ text, to }) {
  const underLineRef = useRef(null);
  // Animation functions and JSX will follow
}
```

The `useRef` hook creates a reference to the underline element, enabling direct GSAP manipulation.

---

### Mouse Enter Animation

```js
const handleMouseEnter = () => {
  gsap.fromTo(
    underLineRef.current,
    {
      x: "-101%",
    },
    {
      x: "0",
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    }
  );
};
```

This animation uses `gsap.fromTo()` to explicitly define both starting and ending states:

- Starting position: `-101%` (completely off-screen left)
- Ending position: `0` (fully visible)
- Duration: `0.6` seconds for smooth, noticeable movement
- Easing: `power3.out` provides natural deceleration
- `overwrite: "auto"` prevents animation conflicts during rapid hover events

---

### Mouse Leave Animation

```js
const handleMouseLeave = () => {
  gsap.to(underLineRef.current, {
    x: "101%",
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto",
    onComplete: () => {
      gsap.set(underLineRef.current, { x: "-101%" });
    },
  });
};
```

The exit animation moves the underline off-screen to the right, then immediately resets its position to the left for the next interaction. The `onComplete` callback ensures the element is properly positioned for subsequent animations.

---

### Complete Implementation

```jsx
export default function LinkText({ text, to }) {
  const underLineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.fromTo(
      underLineRef.current,
      {
        x: "-101%",
      },
      {
        x: "0",
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  };

  const handleMouseLeave = () => {
    gsap.to(underLineRef.current, {
      x: "101%",
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(underLineRef.current, { x: "-101%" });
      },
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`linkText ${className}`}
    >
      <a href={to}>{text}</a>
      <div ref={underLineRef} className="underline"></div>
    </div>
  );
}
```

---

## Performance Considerations

Several optimizations ensure smooth animation performance:

- **CSS `will-change: transform`** informs the browser of upcoming transform changes
- **GSAP's `overwrite: "auto"`** prevents conflicting animations during rapid interactions
- **Transform-based positioning** uses hardware acceleration rather than layout-affecting properties
- **Immediate position reset** in `onComplete` prevents visual glitches

---

## Implementation Usage

The component accepts standard props for flexible integration:

```jsx
<LinkText text="View Portfolio" to="/portfolio" />
<LinkText text="Contact Us" to="/contact" />
```

---

## Animation Behavior

The underline animation creates a sophisticated interaction pattern:

- **Initial state**: Underline positioned off-screen left
- **Mouse enter**: Slides in from left to center
- **Mouse leave**: Slides out to the right
- **Reset**: Immediately repositions off-screen left for next interaction

---

#### This creates the visual effect of the underline "flowing" through the text area, providing clear feedback for interactive states while maintaining smooth, natural motion.

---

## Full Working Code

```codegroup
// LinkText.jsx
import gsap from "gsap";
import React, { useRef } from "react";
import "./LinkText.css";


export default function LinkText({ text = "Hover Me!", to, className }) {
    const underLineRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.fromTo(underLineRef.current, {
            x: "-101%", // Smooth animation using transformX

        }, {
            x: "0",
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(underLineRef.current, {
            x: "101%", // Reset animation using transformX
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
            onComplete: () => {
                gsap.set(underLineRef.current, { x: "-101%" })
            }
        });
    };

    return (
        <>
            {/* The Actual Code */}
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`linkText ${className}`}
            >
                <a href={to}>{text}</a>
                <div ref={underLineRef} className="underLine"></div>
            </div>
        </>
    );
}



// LinkText.css
.linkText {
  font-size: 33px;
  font-weight: 500;
  font-family: "Satoshi";
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.linkText a {
  color: black;
  text-decoration: none;
}

.underLine {
  height: 1px;
  width: 100%;
  margin-top: -4px;
  background-color: black;
  position: relative;
  transform: translateX(-101%);
  will-change: transform;
}

```

---

## Do you think something is missing in this tutorial?

Send me an email at [mohit@bylunar.dev](mailto:mohit@bylunar.dev)

## And with that, You did it!

```footer

```
