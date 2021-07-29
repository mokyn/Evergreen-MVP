import { Link } from "react-router-dom";
import bugGameIcon from "../images/bg.jpg"
import squirrelImage from "../images/squirrel.png"
import favTreeIcon from "../images/favTree2.png"
import achievementsIcon from "../images/achievements.jpg"
import treeShapesIcon from "../images/treeShapesIcon.jpg"
import PageProps from "../Components/PageProps";
import Title from "../Components/Title";
import firebase from "firebase/app";

class Activity {
    name:string;
    url:string;
    image:string;
    desc:string;

    constructor(name:string, url:string, image:string, desc:string){
        this.name=name;
        this.url=url;
        this.image=image;
        this.desc=desc;
    }
}

const Square: React.FC<SquareProps> = (props) => {
    return (
        <div className="rounded bg-green-500">
            <Link to={props.url}>
                <h2 className="text-white text-center text-xl">{props.name}</h2>
                <img className="object-right" alt="thumbnail" src={props.image} width="200" height="200"></img>
                <p className="text-white text-center">{props.desc}</p>
            </Link>
        </div>
    )
}

interface SquareProps {
    name: string;
    image: string;
    url: string;
    desc: string;
  }

const Home: React.FC<PageProps> = (props) => {
    var activities: Activity[] = [];
    activities.push(new Activity("Bug Game", "/game", bugGameIcon, "Squash the bad bugs!"))
    activities.push(new Activity("My Favorite Tree", "/demo", favTreeIcon, "Tree Log!"))
    activities.push(new Activity("Achievements", "/achievements", achievementsIcon, "View your progress!"))
    activities.push(new Activity("Lesson- Tree Shapes", "/treeshapes", treeShapesIcon, "Tree shapes!"))
    return (
        <div>
            <Title/>
            <button className="z-20 absolute top-4 right-8 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    type="button"
                    onClick={()=>{firebase.auth().signOut()}}>
                Log Out
                </button>
            <p className="text-xl m-10">{"Welcome " + props.username}</p>
            <div className="flex m-10 gap-2">
                {activities.map((activity) => {
                    return (
                    <Square name={activity.name} image={activity.image} url={activity.url} desc={activity.desc}/>
                    );
                })}
            </div>
            <img alt="squirrel" className="absolute bottom-0 left-0 h-64 w-64" src={squirrelImage}></img>
      </div>
    )
    };

export default Home;