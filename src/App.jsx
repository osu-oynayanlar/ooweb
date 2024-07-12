// import { useState } from "react";
import "./App.css";
import Navbar from "./pages/navbar/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./pages/user/userPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/u/:userId" element={<UserPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
