import { Link } from "react-router-dom";
import Tree from "../images/pinetree.svg";
import bugGameIcon from "../images/bg.jpg"
import squirrelImage from "../images/squirrel.png"
import favTreeIcon from "../images/favTree2.png"

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

interface HomeProps {
    userID: string;
    username: string;
}

const Home: React.FC<HomeProps> = (props) => {
    /*
    let progress;
    var progressRef = database.ref('users/' + username + '/bugGameProgress');
    progressRef.on('value', (snapshot) => {
        progress = snapshot.val();
    });
    */
    var activities: Activity[] = [];
    activities.push(new Activity("Bug Game", "/game", bugGameIcon, "Squash the bad bugs!"))
    activities.push(new Activity("My Favorite Tree", "/demo", favTreeIcon, "Tree Log!"))
    return (
        <>
        <div className="flex items-center justify-center m-8">
          <img alt="logo" src={Tree} className="m-0 w-20 h-50"></img>
          <h1 className="m-0 font-custom text-green-500	font-bold text-5xl">
            Evergreen
          </h1>
        </div>
        <p className="text-xl m-10">{"Welcome " + props.username}</p>
        <div className="flex m-10 gap-2">
            {activities.map((activity) => {
                return (
                <Square name={activity.name} image={activity.image} url={activity.url} desc={activity.desc}/>
                );
            })}
        </div>
        <img className="absolute bottom-0 left-0 h-64 w-64" src={squirrelImage}></img>
      </>
    )
    };

export default Home;