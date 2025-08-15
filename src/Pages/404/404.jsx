import "./404.css";
import React, { useState } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import { useEffect } from "react";

export default function NotFound() {
  return (
    <div className="main-404-page">
      <div className="not-found-page">
        <h1>404</h1>
        <h3>
          Page Not Found :( <br />
          If you think it is wrong please send a email at{" "}
          <a href="mailto:mohit@bylunar.dev">mohit@bylunar.dev</a>
        </h3>
      </div>
    </div>
  );
}
