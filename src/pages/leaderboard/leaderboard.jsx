import PropTypes from "prop-types";
import useFetch from "../../customHooks/useFetch";
import "./leaderboard.css";
import { Link } from "react-router-dom";

const numFormat = new Intl.NumberFormat("en-US");

const Leaderboard = () => {
    const { data, isPending, error } = useFetch(["https://api.bancho.osuoynayanlar.com.tr/v1/get_leaderboard?sort=pp"]);

    let leaderboardArray;
    let numeroUno;

    if (data[0]) {
        numeroUno = data[0].leaderboard[0];
        leaderboardArray = data[0].leaderboard.slice(1);
    }

    return (
        <div className="leaderboardContainer">
            {isPending && <div className="loading">Loading...</div>}
            {error && <div>{error}</div>}
            {data[0] && (
                <>
                    <div className="numeroUno">
                        <div className="unoRank">#1</div>
                        <div className="unoAvatar">
                            <img
                                src={`https://a.bancho.osuoynayanlar.com.tr/${numeroUno.player_id}`}
                                alt="Profile picture of the top player"
                            />
                        </div>
                        <div className="unoInfoContainer">
                            <div className="unoNick">
                                <Link to={`/u/${numeroUno.player_id}`}>{numeroUno.name}</Link>
                            </div>
                            <div className="unoStats">
                                <div className="peppypoints">{numFormat.format(numeroUno.pp)}pp</div>
                                <div className="accAndPlaycount">
                                    <div className="accuracy">{Number(numeroUno.acc).toFixed(2)}%</div>
                                    <div className="playcount">{numFormat.format(numeroUno.plays)} plays</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="infoRow">
                        <div className="sectionOne">
                            <div className="infoRank">Rank</div>
                            <div className="infoUsername">Username</div>
                        </div>
                        <div className="sectionTwo">
                            <div className="infoAccuracy">Accuracy</div>
                            <div className="pc">Playcount</div>
                            <div className="pp">PP</div>
                        </div>
                    </div>
                    <div className="players">
                        {leaderboardArray.map((player, index) => (
                            <LeaderboardPlayer key={index} playerData={player} rank={index + 2} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const LeaderboardPlayer = ({ playerData, rank }) => {
    // Determine background color based on rank
    let backgroundColor;
    if (rank === 2) {
        backgroundColor = "#726B4A";
    } else if (rank === 3) {
        backgroundColor = "#263428";
    }

    return (
        <div className="player" style={{ backgroundColor: backgroundColor }}>
            <div className="playerSec1">
                <div className="playerRank">#{rank}</div>
                <div className="playerAvatar">
                    <img
                        src={`https://a.bancho.osuoynayanlar.com.tr/${playerData.player_id}`}
                        alt="Profile picture of the top player"
                    />
                </div>
                <div className="playerName">
                    <Link to={`/u/${playerData.player_id}`}>{playerData.name}</Link>
                </div>
            </div>
            <div className="playerSec2">
                <div className="playerAcc">{Number(playerData.acc).toFixed(2)}%</div>
                <div className="playerPC">{numFormat.format(playerData.plays)}</div>
                <div className="playerPP">{numFormat.format(playerData.pp)}pp</div>
            </div>
        </div>
    );
};

LeaderboardPlayer.propTypes = {
    playerData: PropTypes.object.isRequired,
    rank: PropTypes.number.isRequired,
};

export default Leaderboard;
