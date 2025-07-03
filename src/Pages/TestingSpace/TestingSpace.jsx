import React from "react"
import "./TestingSpace.css"
import ComicButton from "../../Components/3DComicButton"
import TextStagger from "../../Components/TextStagger"
import TextSlideButton from "../../Components/TextSlideButton"
import MagneticButton from "../../Components/MagneticButton"
import CursorDraw from "../../Components/CursorDraw"
import OpacityTextReveal from "../../Components/OpacityTextReveal"
import TextScramble from "../../Components/TextScramble"
import MageneticText from "../../Components/MagneticText"
import BouncyButton from "../../Components/BouncyButton"


export default function TestingSpace() {
    const image = "https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_1280.jpg"


    return (
        <div className="main-testing-space">
            <BouncyButton textColor={"white"} background={"black"} text={"HOVER ME"}></BouncyButton>
        </div >
    )
}