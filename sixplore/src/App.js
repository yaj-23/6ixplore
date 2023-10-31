import React from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Profile from './profile';
import Dashboard from './dashboard';
import Navbar from './nav';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/login-db',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => { console.log(err ? err : ' connection true'); }
);

function App() {
  return (
    <>
      <Navbar />

    </>
  )
}

export default App;
