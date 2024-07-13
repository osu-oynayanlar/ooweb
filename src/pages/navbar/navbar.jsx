import SearchInput from "./searchInput";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="serverName">oo!bancho</div>
            <a href="#" className="leaderboardAnchor">
                Leaderboard
            </a>
            <SearchInput />
        </div>
    );
};

export default Navbar;
