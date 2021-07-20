import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Tree from "../images/pinetree.svg";
import bugGameIcon from "../images/bg.jpg"
import squirrelImage from "../images/squirrel.png"
import favTreeIcon from "../images/favTree2.png"
import { firestore } from "../firebase";

interface AchievementsProps {
    userID: string;
    username: string;
}

const Achievements: React.FC<AchievementsProps> = (props) => {
    const [medals, setMedals] = useState([])
    useEffect(() => {
        firestore
          .collection("users/"+props.userID+"/achievements/")
          .get()
          .then((snapshot) => {
            setMedals(snapshot.docs.map((doc) => doc.data()));
          })
      }, []);

    return (
        <div>
            <Link to="/home" className="z-20 absolute top-4 left-8">
                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button">Home</button>
            </Link>

            <h1 className="m-8 font-custom text-green-500 font-bold text-5xl text-center">Achievements</h1>
        </div>
    )
}

export default Achievements;