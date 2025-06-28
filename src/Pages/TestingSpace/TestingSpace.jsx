import React from "react"
import "./TestingSpace.css"
import ComicButton from "../../Components/3DComicButton"
import TextStagger from "../../Components/TextStagger"
import TextSlideButton from "../../Components/TextSlideButton"
import MagneticButton from "../../Components/MagneticButton"
import CursorDraw from "../../Components/CursorDraw"


export default function TestingSpace() {
    const image = "https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_1280.jpg"

    return (
        <div className="main-testing-space">
            <div style={{ width: "500px", height: "300px", border: "1px solid #ccc" }}>
                <CursorDraw />
            </div>
        </div >
    )
}