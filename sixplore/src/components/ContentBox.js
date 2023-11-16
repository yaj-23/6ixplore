import React from 'react'
import '../pages/profile.css'
import unlike from '../assets/xSmall.svg'



export default function ContentBox({name, genres}) {
    return (
        <div className="profile-contentBox">
            <div className="profile-button" >
            <img src={unlike} alt=""/>
            </div>
            <h4>{name}</h4>
            <div className="profile-image"></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {genres.map((d) => (
                    <h3>{d}</h3>
                ))}
            </div>
        </div>
    )
}