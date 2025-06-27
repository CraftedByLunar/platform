import React from "react"
import "./TestingSpace.css"
import ComicButton from "../../Components/3DComicButton"
import TextStagger from "../../Components/TextStagger"
import TextSlideButton from "../../Components/TextSlideButton"
import MagneticButton from "../../Components/MagneticButton"


export default function TestingSpace() {



    return (
        <div className="main-testing-space">
            <MagneticButton onClick={() => { alert("WOOW!") }} text={"Hover me!"} background={"#e3546d"} textColor={"white"}></MagneticButton>
        </div >
    )
}