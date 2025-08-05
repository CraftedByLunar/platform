import "./ImageTrail.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import ImageTrail from "../../Components/LunarComponents/ImageTrail/ImageTrail"
import { useCallback } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);
    const images = ["https://cdn.pixabay.com/photo/2018/04/14/23/21/cute-3320456_960_720.jpg", "https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_1280.jpg", "https://cdn.pixabay.com/photo/2023/12/13/22/29/young-woman-8447841_1280.jpg", "https://cdn.pixabay.com/photo/2022/05/05/12/57/flowers-7176104_640.jpg", "https://cdn.pixabay.com/photo/2022/10/22/17/00/gull-7539615_1280.jpg"]

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/ImageTrail/React/ImageTrail.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/ImageTrail/React/ImageTrail.md");
        } else if (version === "html") {
            loadMarkdown("/ImageTrail/Vanilla/ImageTrailVanilla.md");
        }
    };


    return (
        <div className="main-imageTrail-page">
            <div className="imageTrail-page">
                <ComponentPreview
                    onLanguageChange={handleLanguageChange} componentProps={{ images }} component={ImageTrail} title={"Image Trail"} stack={"gsap"}></ComponentPreview>
                <hr />
                <MDConverter markdown={markdownContent}></MDConverter>

            </div>
        </div>
    );
}