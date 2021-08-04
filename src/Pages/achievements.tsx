import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import gold from "../images/gold.png";
import silver from "../images/silver.png";
import bronze from "../images/bronze.png";
import ProgressBar from "../Components/ProgressBar";
import PageProps from "../types/PageProps";
import HomeButton from "../Components/HomeButton";

const medalImage = (medal) => {
    var i;
    if (medal[1]==="gold") {
        i = <img className="m-auto" alt="gold medal" src={gold} width="50" height="50"></img>
    } else if (medal[1]==="silver") {
        i =  <img className="m-auto" alt="silver medal" src={silver} width="50" height="50"></img>
    } else {
        i = <img className="m-auto" alt="bronze medal" src={bronze} width="50" height="50"></img>
    }
    return (
        <div className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {i}
            <p className="text-center">{medal[0]}</p>
        </div>
    )
}

const Achievements: React.FC<PageProps> = (props) => {
    const [medals, setMedals] = useState<String[][]>([])
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        firestore
          .collection("users/"+props.userID+"/achievements/")
          .get()
          .then((snapshot) => {
            setMedals(snapshot.docs.map((doc) => [doc.id, doc.data().medal]));
            console.log(snapshot.docs.map((doc) => [doc.id, doc.data().medal]));
          })
      }, [props.userID]);

    useEffect(() => {
        firestore.collection("users/"+props.userID+"/progress").doc("bugGame")
        .get()
        .then((doc) => {
          if (doc.exists) {
            setProgress(doc?.data()?.Progress);
        
          }
        })
      },[props.userID]);

    return (
        <div>
            <HomeButton/>
            <h1 className="m-8 font-custom text-green-500 font-bold text-5xl text-center">Achievements</h1>
            <div className="m-10 grid grid-cols-10 gap-10">
                {medals.map(medalImage)}
            </div>
            <h2 className="m-10 text-xl text-green-500 font-semibold">Your progress tree:</h2>
            <img className="m-10" alt="progress tree" src={"/images/tree"+progress.toString()+".png"}></img>
            <div className="m-10">
                <ProgressBar barLength={400} progressPercent={progress / 15} />
            </div>
        </div>
    )
}

export default Achievements;