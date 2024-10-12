import React from 'react'
import '../styles/Point.css'
function Point(){
    return (
        <div className="points">
            <span>320</span>
            <img  src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/point.svg`} alt='search'/>
            </div>
    )
}

export default Point

