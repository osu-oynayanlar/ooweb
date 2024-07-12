import PropTypes from "prop-types";
import useFetch from "../../customHooks/useFetch";
// const regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "region" });

const StatCard = ({ userId }) => {
    const numFormat = new Intl.NumberFormat("en-US");
    const { data, isPending, error } = useFetch([
        `https://api.bancho.osuoynayanlar.com.tr/v1/get_player_info?id=${userId}&scope=stats`,
    ]);

    return (
        <div className="statCard">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data[0] && (
                <>
                    <StatField title="PP" value={numFormat.format(data[0].player.stats["0"].pp)} />
                    <StatField title="Ranked score" value={numFormat.format(data[0].player.stats["0"].rscore)} />
                    <StatField title="Total score" value={numFormat.format(data[0].player.stats["0"].tscore)} />
                    <StatField title="Playcount" value={numFormat.format(data[0].player.stats["0"].plays)} />
                    <StatField title="Playtime" value={numFormat.format(data[0].player.stats["0"].playtime)} />
                    <StatField title="Accuracy" value={`${Number(data[0].player.stats["0"].acc).toFixed(2)}%`} />
                    <StatField title="Total hits" value={numFormat.format(data[0].player.stats["0"].total_hits)} />
                    <StatField title="Max combo" value={numFormat.format(data[0].player.stats["0"].max_combo)} />
                    <StatField title="Replay views" value={numFormat.format(data[0].player.stats["0"].replay_views)} />
                </>
            )}
        </div>
    );
};

StatCard.propTypes = {
    userId: PropTypes.string.isRequired,
};

const StatField = ({ title, value }) => {
    return (
        <div className="statField">
            <b>
                <div className="title">{title}</div>
            </b>
            <div className="value">{value}</div>
        </div>
    );
};

StatField.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default StatCard;
