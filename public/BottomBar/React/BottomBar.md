## Foundation Structure

We'll start with a flexible React component that accepts navigation items as props, ensuring reusability across different projects.

```js
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./BottomNav.css";

export default function BottomNav({ items, className}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemRefs = useRef([]);
  const itemsContainerRef = useRef(null);

  return (
    // Component structure will be built incrementally
  );
}
```

The component uses several key state variables and refs:

- `activeIndex` tracks the currently selected navigation item
- `isMenuOpen` controls mobile menu visibility
- `itemRefs` stores references to individual navigation elements for GSAP targeting
- `itemsContainerRef` provides access to the container for positioning calculations

---

## Main Layout

The navigation consists of nested containers that enable precise control over animations and responsive behavior.

```jsx
return (
  <div className={`lunarNavBarWrapper ${className}`} onMouseLeave={handleItemMouseLeave}>
    <div className="lunarNavLogo">
      <img
        src="https://ywerf4fo8udqtrne.public.blob.vercel-storage.com/lunarNewTransparent-Cb4HhH8q32P1r4iX1bqmdSsfOioHyt.png"
        alt="Logo"
      />
    </div>

    <div className="lunarNavMenuButtonWrapper">
      <div onClick={handleMenuClick} className="lunarNavMenuButton">
        <div
          className={isMenuOpen ? "lunarNavLineOne active" : "lunarNavLineOne"}
        ></div>
        <div
          className={isMenuOpen ? "lunarNavLineTwo active" : "lunarNavLineTwo"}
        ></div>
      </div>
    </div>

    <div className="lunarNavItemsContainer" ref={itemsContainerRef}>
      <div className="lunarNavActiveSelector">
        <div className="lunarNavDot"></div>
      </div>
      <div className="lunarNavHoverSelector"></div>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`lunarNavItem ${activeIndex === index ? "active" : ""}`}
          onMouseEnter={() => handleItemMouseIn(index)}
          onClick={() => handleItemClick(index)}
        >
          <h1>{item}</h1>
        </div>
      ))}
    </div>
  </div>
);
```

---

## CSS Foundation

The base styling establishes the visual hierarchy and prepares elements for animation.

```css
.lunarNavBarWrapper {
  position: relative;
  display: inline-flex;
  background-color: rgb(252, 244, 103);
  border-radius: 50px;
  padding: 5px 45px 5px 5px;
  align-items: center;
  gap: 20px;
  color: black;
}

.lunarNavLogo {
  height: 50px;
  background-color: #ffffff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.lunarNavLogo img {
  height: 25px;
  padding: 0px 10px;
  object-fit: cover;
}
```

Key design decisions include using `inline-flex` for automatic width sizing, strategic padding for visual balance, and `position: relative` on the logo container for potential future animations.

---

## Navigation Items Container

The items container serves as the foundation for our animation system.

```css
.lunarNavItemsContainer {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  gap: 50px;
  opacity: 1;
}

.lunarNavItem {
  cursor: pointer;
  position: relative;
}

.lunarNavItem h1 {
  font-size: 20px;
  font-family: "Satoshi";
  font-weight: 500;
}
```

The `position: relative` property on the container is crucial—it establishes the positioning context for our absolutely positioned animation selectors.

---

## Animation Selectors

Two selector elements handle different interaction states: active and hover.

```css
.lunarNavActiveSelector {
  position: absolute;
  width: var(--selector-width);
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  left: 0;
}

.lunarNavDot {
  height: 4px;
  width: 4px;
  background-color: black;
  border-radius: 50%;
}

.lunarNavHoverSelector {
  position: absolute;
  width: var(--selector-width);
  height: 95%;
  background: rgba(185, 176, 2, 0.6);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 0px 20px;
  opacity: 0;
}
```

The hover selector uses modern CSS features like `backdrop-filter` for a subtle glass effect, while the active selector employs a minimal dot indicator positioned at the bottom of the container.

---

## Mobile Responsiveness

The mobile implementation uses a hamburger menu with smooth line transformations.

```css
.lunarNavMenuButtonWrapper {
  width: 100%;
  display: none;
  justify-content: flex-end;
}

.lunarNavMenuButton {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3px;
  transition: all 0.2s ease-in-out;
}

.lunarNavLineOne,
.lunarNavLineTwo {
  height: 2px;
  width: 85%;
  background-color: black;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.lunarNavLineOne.active {
  transform: rotate(45deg);
}

.lunarNavLineTwo.active {
  transform: rotate(-45deg);
  position: relative;
  top: -4px;
}

.lunarNavMenuButton:active {
  scale: 0.9;
}
```

The hamburger animation uses CSS transforms to rotate the lines into an X formation, with the second line repositioned upward to create proper overlap.

---

## Media Query Implementation

```css
@media (max-width: 590px) {
  .lunarNavMenuButtonWrapper {
    display: flex;
  }

  .lunarNavItemsContainer {
    display: none;
  }

  .lunarNavMenuButton {
    display: flex;
  }

  .lunarNavBarWrapper {
    padding: 5px 10px 5px 5px;
    gap: 5px;
  }
}
```

---

## GSAP Animation System

The animation system centers around tracking the active navigation item and smoothly transitioning selectors to match its position and size.

---

### Active Selector Animation

```js
useEffect(() => {
  const activeItem = itemRefs.current[activeIndex];
  const itemsContainer = itemsContainerRef.current;

  if (activeItem && itemsContainer) {
    const { offsetWidth: width, offsetLeft: left } = activeItem;

    gsap.to(".lunarNavActiveSelector", {
      width,
      left,
      duration: 0.4,
      ease: "power2.out",
    });
  }
}, [activeIndex]);
```

This effect runs whenever the active index changes, calculating the target element's dimensions and position, then smoothly animating the selector to match. The `power2.out` easing provides natural deceleration.

---

### Hover Interactions

```js
const handleItemMouseIn = (index) => {
  const currentItem = itemRefs.current[index];

  if (currentItem) {
    const { offsetWidth: width, offsetLeft: left } = currentItem;

    gsap.to(".lunarNavHoverSelector", {
      opacity: 1,
      width: width + 30,
      left: left - 15,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }
};

const handleItemMouseLeave = () => {
  gsap.to(".lunarNavHoverSelector", {
    opacity: 0,
    duration: 0.2,
    ease: "power2.out",
    overwrite: "auto",
  });
};
```

The hover effect expands the selector beyond the text boundaries (`width + 30`, `left - 15`) and uses faster fade-out timing for responsive feel. The `overwrite: "auto"` property prevents animation conflicts when users rapidly move between items.

---

### Event Handlers

```js
const handleItemClick = (index) => {
  setActiveIndex(index);
};

const handleMenuClick = () => {
  setIsMenuOpen((prev) => !prev);
};
```

---

## Performance Considerations

Several optimizations ensure smooth animations:

1. **CSS `will-change` property** can be added to animated elements to optimize rendering
2. **GSAP's `overwrite` property** prevents conflicting animations
3. **Efficient selectors** using class names rather than complex queries
4. **Strategic use of `position: absolute`** removes elements from normal document flow during animations

---

## Implementation Usage

The component accepts navigation items as props, making it highly reusable:

```jsx
<BottomNav items={["Home", "About", "Services", "Contact"]} />
```

---

## Further Customizations

This foundation supports numerous enhancements: additional animation easing functions, staggered item animations during initial load, integration with routing libraries for URL synchronization, or custom theme systems for different brand applications.

---

## Final Working Code

```codegroup

// BottomNav.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./BottomNav.css";

export default function BottomNav({ items, className }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef([]);
    const itemsContainerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    useEffect(() => {
        const activeItem = itemRefs.current[activeIndex];
        const itemsContainer = itemsContainerRef.current;

        if (activeItem && itemsContainer) {
            const { offsetWidth: width, offsetLeft: left } = activeItem;

            gsap.to(".lunarNavActiveSelector", {
                width,
                left,
                duration: 0.4,
                ease: "power2.out",
            });
        }
    }, [activeIndex]);

    const handleMenuClick = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleItemMouseIn = (index) => {
        const currentItem = itemRefs.current[index];

        if (currentItem) {
            const { offsetWidth: width, offsetLeft: left } = currentItem;

            gsap.to(".lunarNavHoverSelector", {
                opacity: 1,
                width: width + 30,
                left: left - 15,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });
        }
    };

    const handleItemMouseLeave = () => {
        gsap.to(".lunarNavHoverSelector", {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={`lunarNavBarWrapper ${className}`} onMouseLeave={handleItemMouseLeave}>
            {/* Logo Section */}
            <div className="lunarNavLogo">
                <img
                    src="https://ywerf4fo8udqtrne.public.blob.vercel-storage.com/lunarNewTransparent-Cb4HhH8q32P1r4iX1bqmdSsfOioHyt.png"
                    alt="Logo"
                />
            </div>

            {/* Menu Button */}
            <div className="lunarNavMenuButtonWrapper">
                <div onClick={handleMenuClick} className="lunarNavMenuButton">
                    <div className={isMenuOpen ? "lunarNavLineOne" : "lunarNavLineOne active"}></div>
                    <div className={isMenuOpen ? "lunarNavLineTwo" : "lunarNavLineTwo active"}></div>
                </div>
            </div>

            {/* Navigation Items */}
            <div className="lunarNavItemsContainer" ref={itemsContainerRef}>
                <div className="lunarNavActiveSelector">
                    <div className="lunarNavDot"></div>
                </div>
                <div className="lunarNavHoverSelector"></div>
                {items.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`lunarNavItem ${activeIndex === index ? "active" : ""}`}
                        onMouseEnter={() => handleItemMouseIn(index)}
                        onClick={() => handleItemClick(index)}
                    >
                        <h1>{item}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}



// BottomNav.css
.lunarNavBarWrapper {
  position: relative;
  display: inline-flex;
  background-color: rgb(252, 244, 103);
  border-radius: 50px;
  padding: 5px 45px 5px 5px;
  align-items: center;
  gap: 20px;
  color: black;
}

.lunarNavItemsContainer {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  gap: 50px;
  opacity: 1;
}

.lunarNavHoverSelector {
  position: absolute;
  width: var(--selector-width);
  height: 95%;
  background: rgba(185, 176, 2, 0.6);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 0px 20px;
  opacity: 0;
}

.lunarNavActiveSelector {
  position: absolute;
  width: var(--selector-width);
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  left: 0;
}

.lunarNavDot {
  height: 4px;
  width: 4px;
  background-color: black;
  border-radius: 50%;
}

.lunarNavItem h1 {
  font-size: 20px;
  font-family: "Satoshi";
  font-weight: 500;
}

.lunarNavItem {
  cursor: pointer;
  position: relative;
}

.lunarNavLogo {
  height: 50px;
  background-color: #ffffff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.lunarNavLogo img {
  height: 25px;
  padding: 0px 10px;
  object-fit: cover;
}

.lunarNavMenuButton {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3px;
  transition: all 0.2s ease-in-out;
}

.lunarNavMenuButtonWrapper {
  width: 100%;
  display: none;
  justify-content: flex-end;
}

.lunarNavLineOne,
.lunarNavLineTwo {
  height: 2px;
  width: 85%;
  background-color: black;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.lunarNavLineOne.active {
  transform: rotate(45deg);
}

.lunarNavLineTwo.active {
  transform: rotate(-45deg);
  position: relative;
  top: -4px;
}

.lunarNavMenuButton:active {
  scale: 0.9;
}

@media (max-width: 590px) {
  .lunarNavMenuButtonWrapper {
    display: flex;
  }

  .lunarNavItemsContainer {
    display: none;
  }

  .lunarNavMenuButton {
    display: flex;
  }

  .lunarNavBarWrapper {
    padding: 5px 10px 5px 5px;
    gap: 5px;
  }
}


```

---

## Do you think something is missing in this tutorial?

Send me an email at [mohit@craftedbylunar.xyz](mailto:mohit@craftedbylunar.xyz)

---

## And with that, You did it!

```footer

```
