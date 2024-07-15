import PropTypes from "prop-types";
import useFetch from "../../customHooks/useFetch";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import getCountryName from "../../utils/countryCode";
const numFormat = new Intl.NumberFormat("en-US");
dayjs.extend(relativeTime);

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
                        <div className="userDataContainer">
                            <img
                                src={`https://a.bancho.osuoynayanlar.com.tr/${userInfo.player.info.id}`}
                                alt="Profile picture of the user"
                                className="pfp"
                            />
                            <div className="killMeContainer">
                                <div className="userInfo">
                                    <div className="username">{userInfo.player.info.name}</div>
                                    <div className="playerSince">
                                        Player since:
                                        <b> {dayjs.unix(userInfo.player.info.creation_time).fromNow()}</b>
                                    </div>
                                    <div className="recentActivity">
                                        Latest activity:
                                        <b> {dayjs.unix(userInfo.player.info.latest_activity).fromNow()}</b>
                                    </div>
                                </div>

                                <div className="userCardRow">
                                    <div className="flagAndStatus">
                                        <img
                                            src={countryCodeToFlagURL(userInfo.player.info.country)}
                                            className="countryFlag"
                                        />
                                        <div className="countryName">
                                            {getCountryName(String(userInfo.player.info.country).toUpperCase())}
                                        </div>
                                    </div>
                                    <div className="rankContainer">
                                        <div className="rank">#{numFormat.format(userRank)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
