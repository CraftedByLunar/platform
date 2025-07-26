import "./StartingPage.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState(``);

    useEffect(() => {
        fetch('/Introduction.md')
            .then(response => response.text())
            .then(text => {
                setMarkdownContent(text);
            })
            .catch(error => console.error("Error loading markdown file:", error));
    }, []);


    return (
        <div className="main-start-page">
            <div className="start-page">
                <MDConverter markdown={markdownContent}></MDConverter>
            </div>
        </div>
    );
}