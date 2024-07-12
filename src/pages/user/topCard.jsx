import PropTypes from "prop-types";
import useFetch from "../../customHooks/useFetch";
import "./userPage.css";
import { getModString } from "../../constants/mods";

const numFormat = new Intl.NumberFormat("en-US");

const TopCard = ({ userId }) => {
    const { data, isPending, error } = useFetch([
        `https://api.bancho.osuoynayanlar.com.tr/v1/get_player_scores?id=${userId}&scope=best`,
    ]);

    let scores;
    let topFields;

    if (data[0]) {
        scores = data[0].scores;
        topFields = scores.map((play, index) => <TopField key={index} play={play} />);
    }

    return (
        <div className="topCard">
            <div className="topText">Top plays</div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data[0] ? (
                data[0].status === "success" ? (
                    topFields
                ) : (
                    <div className="notFound">User not found.</div>
                )
            ) : null}
            {/* <TopField /> */}
        </div>
    );
};

const TopField = ({ play }) => {
    const score = numFormat.format(play.score);
    const pp = Math.trunc(Number(play.pp));
    const acc = Number(play.acc).toFixed(2) + "%";
    const mods = play.mods;
    const maxCombo = play.max_combo;
    const grade = play.grade;
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const playTime = new Date(play.play_time).toLocaleString("en-US", options);
    const map = play.beatmap;

    return (
        <div className="topField">
            <div className="imgContainer">
                <img
                    src={`https://assets.ppy.sh/beatmaps/${map.set_id}/covers/list@2x.jpg`}
                    alt="map bg"
                    className="mapBg"
                />
            </div>

            <div className="mapInfo">
                <div className="mapTitle">{`${map.artist} - ${map.title} [${map.version}] (${map.creator})`}</div>
                <div className="stats">
                    {`${score} / ${maxCombo}x`}
                    {mods !== 0 && (
                        <>
                            {" "}
                            / <b>{getModString(mods)}</b>
                        </>
                    )}
                </div>
                <div className="date">{playTime}</div>
            </div>
            <div className="ppAcc">
                <div className="pp">{pp}pp</div>
                <div className="acc">Accuracy: {acc}</div>
            </div>
        </div>
    );
};

TopField.propTypes = {
    play: PropTypes.object.isRequired,
};

TopCard.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default TopCard;
