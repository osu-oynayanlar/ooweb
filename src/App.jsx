// import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./pages/user/userPage";
import Leaderboard from "./pages/leaderboard/leaderboard";
import Landing from "./pages/landing/landing";
// import NotFound from "./pages/notFound/notFound";
import Footer from "./components/footer/footer";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/u/:userId" element={<UserPage />} />
                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
