import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import "./MDConverter.css";

function CodeBlockWithCopy({ codeContent, language }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="code-block" style={{ position: "relative" }}>
            <button className="copy-code-btn" onClick={handleCopy} aria-label="Copy Code">
                <svg
                    id="checkMark"
                    height="16"
                    width="16"
                    style={{
                        opacity: copied ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                        position: "absolute",
                        color: "#DADADA",
                    }}
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="#DADADA"
                        d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                    />
                </svg>

                <svg
                    id="copyMark"
                    height="16"
                    width="16"
                    style={{
                        opacity: copied ? 0 : 1,
                        transition: "opacity 0.3s ease-in-out",
                        position: "absolute",
                        color: "#DADADA",
                    }}
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="#DADADA"
                        d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z"
                    />
                </svg>
            </button>

            <SyntaxHighlighter
                customStyle={{ borderRadius: "10px", border: "2px solid var(--borderColorBlack)" }}
                language={language}
                style={tomorrow}
                showLineNumbers
                wrapLongLines
            >
                {codeContent}
            </SyntaxHighlighter>
        </div>
    );
}
function CodeGroup({ code }) {
    const [activeFile, setActiveFile] = useState(null);

    const files = code
        .trim()
        .split(/(?=^\/\/\s.+)/gm)
        .map((section) => {
            const lines = section.trim().split("\n");
            const filename = lines[0].replace("// ", "").trim();
            const content = lines.slice(1).join("\n");
            return { filename, content };
        });

    useEffect(() => {
        if (!activeFile && files.length) {
            setActiveFile(files[0].filename);
        }
    }, [files, activeFile]);

    const active = files.find((f) => f.filename === activeFile);
    const language = active?.filename?.split(".").pop() || "javascript";

    return (
        <div className="codegroup">
            <div className="tabs">
                {files.map((f) => (
                    <button
                        key={f.filename}
                        className={`tab ${f.filename === activeFile ? "active" : ""}`}
                        onClick={() => setActiveFile(f.filename)}
                    >
                        {f.filename}
                    </button>
                ))}
            </div>

            {active && (
                <CodeBlockWithCopy
                    codeContent={active.content}
                    language={language}
                />
            )}
        </div>
    );
}


export default function MDConverter({ markdown }) {
    const components = {
        code({ node, inline, className, children, ...props }) {
            const codeContent = String(children).trim();
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match && match[1] === "footer") {
                return (
                    <div className="footer-docs" style={{ height: "100px" }}>
                        <div className="wrap-xzfdsf">
                            <p>
                                Proudly created with 💖 by <a href="https://codedbymohit.xyz">Mohit Tiwari</a>
                            </p>
                            <p className="small-txt-p">
                                shh... visit this <Link to="/app/testing-space">page</Link> for leeks
                            </p>
                        </div>
                        <div className="links-docs">
                            <Link to="/app/terms">Terms & Conditions</Link>
                            <Link to="/redirect/github">Github</Link>
                        </div>
                    </div>
                );
            }

            if (!inline && match && match[1] === "space") {
                return <div style={{ height: "50px" }} />;
            }

            if (!inline && match && match[1] === "footerFull") {
                return (
                    <div className="footer-docs full" style={{ height: "100px" }}>
                        <div className="wrap-xzfdsf">
                            <p>
                                Proudly created with 💖 by <a href="https://codedbymohit.xyz">Mohit Tiwari</a>
                            </p>
                            <p className="small-txt-p">
                                shh... visit this <Link to="/app/testing-space">page</Link> for leeks
                            </p>
                        </div>
                        <div className="links-docs">
                            <Link to="/terms">Terms & Conditions</Link>
                            <Link to="/github">Github</Link>
                        </div>
                    </div>
                );
            }

            if (!inline && match && match[1] === "codegroup") {
                return <CodeGroup code={codeContent} />;
            }

            const isInline = !className && !codeContent.includes("\n");
            if (isInline) {
                return <code className="inline-code" {...props}>{codeContent}</code>;
            }

            const language = match ? match[1] : "javascript";

            return <CodeBlockWithCopy codeContent={codeContent} language={language} />;
        },
    };

    return (
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {markdown}
        </ReactMarkdown>
    );
}
