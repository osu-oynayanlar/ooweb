import { useParams } from "react-router-dom";
// import useFetch from "../../customHooks/useFetch";
import UserCard from "./userCard";
import "./userPage.css";
import StatCard from "./statCard";
import TopCard from "./topCard";

const UserPage = () => {
    const { userId } = useParams();

    return (
        <div className="container">
            <UserCard userId={userId} />
            <div className="rowContainer">
                <StatCard userId={userId} />
                <TopCard userId={userId} />
            </div>
        </div>
    );
};

export default UserPage;
