import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { string } from "yargs";
import gold from "../images/gold.png"
import silver from "../images/silver.png"
import bronze from "../images/bronze.png"
interface AchievementsProps {
    userID: string;
    username: string;
}

const medalImage = (medal) => {
    var i
    if (medal[1]=="gold") {
        i = <img className="m-auto" src={gold} width="50" height="50"></img>
    } else if (medal[1]=="silver") {
        i =  <img className="m-auto" src={silver} width="50" height="50"></img>
    } else {
        i = <img className="m-auto" src={bronze} width="50" height="50"></img>
    }
    return (
        <div className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {i}
            <p className="text-center">{medal[0]}</p>
        </div>
    )
}

const Achievements: React.FC<AchievementsProps> = (props) => {
    const [medals, setMedals] = useState<String[][]>([])
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        firestore
          .collection("users/"+props.userID+"/achievements/")
          .get()
          .then((snapshot) => {
            setMedals(snapshot.docs.map((doc) => [doc.id, doc.data().medal]));
          })
      }, []);

    useEffect(() => {
        firestore.collection("users/"+props.userID+"/progress").doc("bugGame")
        .get()
        .then((doc) => {
          if (doc.exists) {
            setProgress(doc.data().Progress);
          }
        })
      },[])

    return (
        <div>
            <Link to="/home" className="z-20 absolute top-4 left-8">
                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button">Home</button>
            </Link>
            <h1 className="m-8 font-custom text-green-500 font-bold text-5xl text-center">Achievements</h1>
            <div className="m-10 grid grid-cols-10 gap-10">
                {medals.map(medalImage)}
            </div>
            <h2 className="m-10 text-xl text-green-500 font-semibold">Your progress tree:</h2>
            <img src={"/images/tree"+progress.toString()+".png"}></img>
        </div>
    )
}

export default Achievements;