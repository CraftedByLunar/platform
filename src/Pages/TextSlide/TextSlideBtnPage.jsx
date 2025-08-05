import "./TextSlideBtnPage.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import TextSlideButton from "../../Components/LunarComponents/TextSlideButton/TextSlideButton"
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "HOVER ME!"
    const textColor = "black"
    const color = "white"
    const secondaryColor = "black"
    const secondaryTextColor = "white"
    const onClick = () => {
        alert("Isn't this awesome?")
    }

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/TextSlideButton/React/TextSlideButton.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/TextSlideButton/React/TextSlideButton.md");
        } else if (version === "html") {
            loadMarkdown("/TextSlideButton/Vanilla/TextSlideButtonVanilla.md");
        }
    };


    return (
        <div className="main-textSlide-page">
            <div className="textSlide-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} component={TextSlideButton} componentProps={{ onClick, text, color, secondaryColor, secondaryTextColor, textColor }} title={"Text Slide Button"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}