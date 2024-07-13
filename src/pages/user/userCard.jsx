import PropTypes from "prop-types";
import useFetch from "../../customHooks/useFetch";
const regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "region" });
const numFormat = new Intl.NumberFormat("en-US");

const countryCodeToFlagURL = (countryCode) => {
    const base = 0x1f1e6;
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => (base + char.charCodeAt(0) - "A".charCodeAt(0)).toString(16))
        .join("-");
    return `https://akatsuki.gg/static/images/flags/${codePoints}.svg`;
};

const UserCard = ({ userId }) => {
    const { data, isPending, error } = useFetch([
        `https://api.bancho.osuoynayanlar.com.tr/v1/get_player_info?id=${userId}&scope=all`,
        `https://api.bancho.osuoynayanlar.com.tr/v1/get_leaderboard?sort=pp`,
    ]);

    let userInfo;

    if (data[0]) {
        userInfo = data[0];
    }

    let userRank;

    if (data[1]) {
        const leaderboard = data[1].leaderboard;
        userRank = leaderboard.findIndex((obj) => obj.player_id === Number(userId));
        userRank++;
    }

    return (
        <div className="userCard">
            {isPending && <div className="loading">Loading...</div>}
            {error && <div>{error}</div>}
            {userInfo ? (
                userInfo.status === "success" ? (
                    <>
                        <img
                            src={`https://a.bancho.osuoynayanlar.com.tr/${userInfo.player.info.id}`}
                            alt="Profile picture of the user"
                            className="pfp"
                        />
                        <div className="userInfo">
                            <div className="username">{userInfo.player.info.name}</div>
                            <div className="playerSince">
                                Player since:
                                <b> {new Date(Number(userInfo.player.info.creation_time) * 1000).toLocaleString()}</b>
                            </div>
                            <div className="recentActivity">
                                Latest activity:
                                <b> {new Date(Number(userInfo.player.info.latest_activity) * 1000).toLocaleString()}</b>
                            </div>
                            <div className="flagAndStatus">
                                <img src={countryCodeToFlagURL(userInfo.player.info.country)} className="countryFlag" />
                                <div className="countryName">
                                    {regionNamesInEnglish.of(userInfo.player.info.country)}
                                </div>
                            </div>
                        </div>
                        <div className="rank">#{numFormat.format(userRank)}</div>
                    </>
                ) : (
                    <div className="notFound">User not found.</div>
                )
            ) : null}
        </div>
    );
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserCard;
