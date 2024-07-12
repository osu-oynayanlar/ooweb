import "./navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="serverName">oo!bancho</div>
            <a href="#" className="leaderboardAnchor">
                Leaderboard
            </a>
            <input type="text" name="searchPlayer" id="searchPlayer" placeholder="Search a player..." />
        </div>
    );
};

export default Navbar;
