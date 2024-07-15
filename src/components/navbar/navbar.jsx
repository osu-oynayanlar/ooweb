import SearchInput from "./searchInput";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="serverName">
                <Link to="/">oo!bancho</Link>
            </div>
            <Link to="/leaderboard" className="leaderboardAnchor">
                Leaderboard
            </Link>
            <SearchInput />
        </div>
    );
};

export default Navbar;
