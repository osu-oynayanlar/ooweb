import "./landing.css";
import { useEffect, useState } from "react";
import oob from "./oob!!!!.png";

const Landing = () => {
    return (
        <div className="landingContainer">
            <div className="infoAndIcon">
                <div className="wallOfText">
                    <div className="serverTitle">osu!oynayanlar Bancho</div>
                    <div className="serverDescription">
                        oo!bancho is a private osu! server created exclusively for the OSU OYNAYANLAR Discord community.
                        It uses the open source bancho.py server made by the Akatsuki developers.
                    </div>
                    <div className="connectTitle">How do I connect?</div>
                    <div className="connectDescription">
                        It is very simple. Start by copying the osu! shortcut you already have (or create one by right
                        clicking the osu!.exe in <span className="codeblock">%localappdata%</span>). Right click on it,
                        and select “Properties”. This will open up a window. In that window, add{" "}
                        <span className="codeblock">-devserver bancho.osuoynayanlar.com.tr</span> at the end of the
                        “Target” property. After applying and launching the shortcut, you will be connected to
                        oo!bancho.
                    </div>
                </div>
                <div className="icon">
                    <img src={oob} alt="oob! logo" />
                </div>
            </div>
            <ServerStats />
        </div>
    );
};

const ServerStats = () => {
    const [online, setOnline] = useState(0);
    const [total, setTotal] = useState(0);
    const [topPlay, setTopPlay] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetch("https://api.bancho.osuoynayanlar.com.tr/v1/get_player_count").then((res) => res.json()),
            fetch("https://api.bancho.osuoynayanlar.com.tr/v2/scores").then((res) => res.json()),
        ])
            .then(([playerCountData, scoresData]) => {
                setOnline(playerCountData.counts.online);
                setTotal(playerCountData.counts.total);
                const filteredScores = scoresData.data.filter((score) => {
                    const passesGradeCheck = score.grade !== "F";
                    const passesModeCheck = score.mode === 0;

                    return passesGradeCheck && passesModeCheck;
                });
                if (filteredScores.length > 0) {
                    setTopPlay(filteredScores[0].pp);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="serverStats">
            {!isLoading && (
                <>
                    <div className="serverStatCard">
                        <div className="statTitle">Registered Users</div>
                        <div className="statValue">{total}</div>
                    </div>
                    <div className="serverStatCard">
                        <div className="statTitle">Currently Online</div>
                        <div className="statValue">{online}</div>
                    </div>
                    <div className="serverStatCard">
                        <div className="statTitle">Highest PP Play</div>
                        <div className="statValue">{Math.round(topPlay)}pp</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Landing;
