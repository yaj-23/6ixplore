import React from 'react'
import '../pages/profile.css'


const events = [
    {
      location: "123 One Piece Avenue, Konoha A1B2C3",
      genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
    },
  ]

export default function contentBox(location, genres) {
    return (
        
        <div className="profile-contentBox"//top left
        >
            {events.map(({location, genres}) => (
                <>
                    <h4>{location}</h4>
                    <div className="profile-image"></div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                        {genres.map((d) => (
                            <>
                                <h3>{d}</h3>
                            </>
                        ))}
                    </div>

                </>
            ))}
        </div>
    )
}