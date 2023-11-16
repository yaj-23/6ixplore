import React from 'react'
import './profile.css'
import Navbar from '../components/navbar/nav'
import ContentBox from '../components/ContentBox';

const Plans = ["Last Minute Day Trips", "Date Night ideas", "@ AM Food Runs", "FUN",];

var name = "Gary Deng"
var email = "gary.deng@torontomu.ca"
var phoneNumber = "(647) 999-9999"

const events = [
  {
    name: "EXAMPLE EVENT",
  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },
  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },{
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },
  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },
  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },
  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },
  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },

  {
    name: "EXAMPLE EVENT",
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
              {events.map(({ name, genres }) => {
                return (
                  <div>
                    <ContentBox name={name} genres={genres} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}