import React from 'react'
import './profile.css'
import Navbar from '../components/navbar/nav'
import { Button } from '../components/button/Button'

const Plans = ["Last Minute Day Trips", "Date Night ideas", "@ AM Food Runs", "FUN",];

var name = "Gary Deng"
var email = "gary.deng@torontomu.ca"
var phoneNumber = "(647) 999-9999"

const events = [
  {
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },
]

export default function Signup() {
  return (
    <div>
      <Navbar />

      <div className="profile" id="profile">
        <div className="profile-bigDiv">
          <div className="leftDiv">

            <h2> Profile Information</h2>
            <div className="profile-scaleBox">
              <h1>{name}</h1>
              <h1>{email}</h1>
              <h1>{phoneNumber}</h1>
            </div>

            <h2>Plans</h2>
            <div className="profile-scaleBox3">

              {Plans.map((Plan) => (
                <h1> {Plan} </h1>
              ))}
            </div>
          </div>

          <div className="profile-rightDiv">
            <h2>Liked Destinations</h2>
            <div className="profile-scaleBox2">
            <div className="profile-boxDiv">

              <div className="profile-contentBox"//top left
              >
                {events.map(({ location, genres, rating }) => (
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
              <div className="profile-contentBox" // top middle
              >
                {events.map(({ location, genres, rating }) => (
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
              <div className="profile-contentBox" //top right
              >
                {events.map(({ location, genres, rating }) => (
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
              </div>
              <div className="profile-boxDiv">
              <div className="profile-contentBox" //bottom left
              > 
                {events.map(({ location, genres, rating }) => (
                  <>
                    <h4>{location}</h4>
                    <div className="profile-image">
                    </div>
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
              <div className="profile-contentBox" //bottom middle
              > 
                {events.map(({ location, genres, rating }) => (
                  <>
                    <h4>{location}</h4>
                    <div className="profile-image">
                    </div>
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
              <div className="profile-contentBox" //bottom right
              >
                {events.map(({ location, genres, rating }) => (
                  <>
                    <h4>{location}</h4>
                    <div className="profile-image">
                    </div>
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
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  )
}