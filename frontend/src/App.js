import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './Home';
import Structure from './Structure';
import Journal from './Journal';
import Login from './Login';
import Signup from './Signup';
import Affirmations from './Affirmations';
import Readings from './Readings';
import Meditation from './Meditation'
import Read from './Read';

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
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/affirmations" element={<Affirmations />} />
                        <Route path="/readings" element={<Readings />} />
                        <Route path="/readings/read" element={<Read />} />
                        <Route path="/meditation" element={<Meditation />} />
                    </Routes>                             
                </Structure>
            </Router>
        </div>
    );
};
export default App;