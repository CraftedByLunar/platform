import "./ComicButton.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import ComicButton from "../../Components/LunarComponents/3DComicButton/3DComicButton"
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const text = "Click Me!"

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
        <div className="main-comicButton-page">
            <div className="comicButton-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} componentProps={{ text }} component={ComicButton} title={"Comic Button"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}