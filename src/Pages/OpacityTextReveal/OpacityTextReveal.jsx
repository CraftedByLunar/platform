import "./OpacityTextReveal.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import OpacityTextReveal from "../../Components/LunarComponents/OpacityTextReveal/OpacityTextReveal"
import { useCallback } from "react";


// work in progress

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "Hey! this effect looks amazing right? Why not use it in your next project?"
    const color = "black"

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/ComicButton/React/ComicButton.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/ComicButton/React/ComicButton.md");
        } else if (version === "html") {
            loadMarkdown("/ComicButton/Vanilla/ComicButtonVanilla.md");
        }
    };


    return (
        <div className="main-opacityTextReveal-page">
            <div className="opacityTextReveal-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} componentProps={{ text, color }} component={OpacityTextReveal} title={"Comic Button"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}