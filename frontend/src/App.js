import React from 'react';
import {BrowserRouter as Router, Switch, Routes, Route, Link} from "react-router-dom";
import './App.css';
import Home from './Home';
import Structure from './Structure';
import Journal from './Journal';
import Login from './Login';

// import {useState, useEffect} from 'react';

const App = () => {
    return (
        <div>
            <Router>
                <Structure>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/journal" element={<Journal/>} />
                        <Route path="/login" element={<Login />} />
                    </Routes>                             
                </Structure>
            </Router>
        </div>
    );
};
export default App;