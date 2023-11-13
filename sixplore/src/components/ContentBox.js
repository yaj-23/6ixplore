import React from 'react'
import '../pages/profile.css'

export default function ContentBox({location, genres}) {
    return (
        <div className="profile-contentBox">
            <h4>{location}</h4>
            <div className="profile-image"></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {genres.map((d) => (
                    <h3>{d}</h3>
                ))}
            </div>
        </div>
    )
}