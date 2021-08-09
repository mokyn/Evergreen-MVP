import React, { useState, useEffect, useRef } from "react";
import {Motion, spring} from 'react-motion';
import { Link } from "react-router-dom";
import ladyBugImg from "../images/ladybug.png";
import beeImg from "../images/bee.png";
import miteImg from "../images/mite.png";
import slugImg from "../images/slug.png";
import backgroundImg from "../images/sky.jpg";
import { firestore } from "../firebase";
import "../index.css";
import saveProgress from "../Functions/saveProgress";
import addMedal from "../Functions/addMedal";
import PageProps from "../types/PageProps";
import leafImg from "../images/leaf.png"
import paw from "../images/paw.png"
import { dir } from "console";

// number of bad bugs to be clicked to win the game
const TARGET_CORRECT_GUESSES: number = 15;

// number of max bugs on screen at any time
const UPPER_BUG_COUNT: number = 10;

const VIEW_WIDTH = document.documentElement.clientWidth;
const VIEW_HEIGHT = document.documentElement.clientHeight;

// modal component that appears when clicking a bug
interface ModalProps {
  showModal: boolean;
  hasWon: boolean;
  isFriendly: boolean;
  onClick: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  let modalContent, modalHeader;
  if (props.hasWon) {
    modalHeader = "Congratulations!";
    modalContent = "You have won the game.";
  } else if (props.isFriendly) {
    modalHeader = "Oops!";
    modalContent = "That's a good bug.";
  } else {
    modalHeader = "Correct!";
    modalContent = "That's a bad bug.";
  }

  if (props.showModal) {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{modalHeader}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={props.onClick}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  {modalContent}
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={props.onClick}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  } else {
    return null;
  }
};

// bug component
interface BugProps {
  key: number;
  id: number;
  bugType: string;
  handleBug: (bugType: string, id: number, x:number, y:number) => void;
}

const Bug: React.FC<BugProps> = (props) => {
  const [x, setX] = useState(VIEW_WIDTH * Math.random());
  const [y, setY] = useState(VIEW_HEIGHT * Math.random());
  const [targetX, setTargetX] = useState(VIEW_WIDTH * Math.random());
  const [targetY, setTargetY] = useState(VIEW_HEIGHT * Math.random());
  const [isOnHover, setIsOnHover] = useState(false);
  const [direction, setDirection] = useState(0);

  // useRef hook enables values to persist in successive renders
  const posIntervalID = useRef(0);
  const moveIntervalID = useRef(0);

  useEffect(() => {
    // when component mounts
    const newPos = () => {
      if (Math.random() > 0.5) {
        let tx: number = VIEW_WIDTH * Math.random();
        let ty: number = VIEW_HEIGHT * Math.random();
        while (((tx-(VIEW_WIDTH/2+100))/1100)**2+((ty-VIEW_HEIGHT/2)/600)**2>=0.3) {
          tx= VIEW_WIDTH * Math.random();
          ty= VIEW_HEIGHT * Math.random();
        }

        setTargetX(tx);
        setTargetY(ty);
      }

      //x={VIEW_WIDTH/2-780} y={VIEW_HEIGHT/2-900} width={1800} height={1800}
    };

    // component finds a new target position every 2 second
    posIntervalID.current = window.setInterval(newPos, 1000);

    return () => {
      // when component unmounts
      clearInterval(posIntervalID.current);
    };
  }, []);

  useEffect(() => {
    const move = () => {
      const moveRate = 0.01;

      setX((x) => (moveRate * targetX + x) / (1 + moveRate));
      setY((y) => (moveRate * targetY + y) / (1 + moveRate));
    };

    // component changes x, y values every 20ms
    moveIntervalID.current = window.setInterval(move, 20);

    return () => {
      clearInterval(moveIntervalID.current);
    };
  }, [targetX, targetY]);

  const changeHoverStyle = () => {
    setIsOnHover((prevState) => !prevState);
  };

  const bugImgStyle = {
    filter: "none",
  };

  const hoverBugImgStyle = {
    cursor: "pointer",
    filter: "drop-shadow(2px 2px 4px #cc0000)",
  };

  return (
    // foreign object is used to wrap the image and render it on svg canvas
    <foreignObject x={x} y={y} width="120" height="120" onClick={() => props.handleBug(props.bugType, props.id, x, y)}>
      <img
        src={BUGS[props.bugType].imgSrc}
        alt={`${props.bugType}`}
        style={isOnHover ? hoverBugImgStyle : bugImgStyle}
        onMouseOver={changeHoverStyle}
        onMouseLeave={changeHoverStyle}
      />
    </foreignObject>
  );
};

interface BugItem {
  bugType: string;
  imgSrc: string;
  isFriendly: boolean;
}

// this enum stores all values associated with objects in the game
// also helps prevent naming inconsistencies

const BUGS: { [key: string]: BugItem } = {
  LADY_BUG: {
    bugType: "LADY_BUG",
    imgSrc: ladyBugImg,
    isFriendly: true,
  },
  BEE: {
    bugType: "BEE",
    imgSrc: beeImg,
    isFriendly: true,
  },
  MITE: {
    bugType: "MITE",
    imgSrc: miteImg,
    isFriendly: false,
  },
  SLUG: {
    bugType: "SLUG",
    imgSrc: slugImg,
    isFriendly: false,
  },
};

interface PawProps {
  squashing: boolean;
}

const Paw: React.FC<PawProps> = (props) => {
  const a = useRef(0);
  const intervalID = useRef(0);
  const [x, setx] = useState(0);
  const [y, sety] = useState(VIEW_HEIGHT-200);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => {setMouse({ x: e.clientX, y: e.clientY });
                                console.log(e.clientX, e.clientY)};
    window.addEventListener("mousemove", setFromEvent);

    /*return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };*/
  }, [a]);

  const move = () => {
    console.log("moved")
    if (!props.squashing) {
      setx((x)=>{return (x+mouse.x-500)/2})
      sety((y)=>{return (y+mouse.y+50)/2})
    } else {
      setx((x)=>{return (x+mouse.x-300)/2})
      sety((y)=>{return (y+mouse.y-150)/2})
    }
  }

  useEffect(()=>{
    intervalID.current = window.setInterval(move, 10);

    return () => {
      clearInterval(intervalID.current);
    };
  })

  return (
    <foreignObject x={x} y={y} width={500} height={500}>
      <img
        height={500}
        width={500}
        src={paw}
        alt={`paw`}
      />
    </foreignObject>
    )
}

interface ProgressBarProps {
  barLength: number;
  progressPercent: number;
}  

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const [progressBarLength, setProgresBarLength] = useState(0);

  // runs every time the component rerenders
  useEffect(() => {
    setProgresBarLength(props.progressPercent * props.barLength);
  }, [props.progressPercent, props.barLength]);

  const progressBarStyle = {
    backgroundColor: "rgb(233, 233, 233)",
    borderRadius: "0.5rem",
    width: `${props.barLength}px`,
  };

  const filledProgressBarStyle = {
    backgroundColor: "rgb(50, 199, 90)",
    height: "10px",
    borderRadius: "1rem",
    width: `${progressBarLength}px`,
    // animation
    transition: "1s ease",
  };

  return (
    <div>
      <div style={progressBarStyle}>
        <div style={filledProgressBarStyle} />
      </div>
    </div>
  );
};

interface MessageProps {
  text: string;
  x:number;
  y:number;
}  

const bugTypes = Object.keys(BUGS);

// main parent component
const Game: React.FC<PageProps> = (props) => {
  // define states using state hook
  // typescript implicitly knows the type of each state from initial value
  const [squashing, setSquashing] = useState(false);
  const [text, setText] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBugType, setCurrentBugType] = useState(""); // so that modal component knows a bug is good or bad
  const [hasWon, setHasWon] = useState(false);
  const [correctBugs, setCorrectBugs] = useState(0); // tracking progress
  const [bugIds, setBugIds] = useState<number[]>([]); // an array of bug ids
  const [messageText, setMessageText] = useState("");
  const [messageX, setMessageX] = useState(0);
  const [messageY, setMessageY] = useState(0);
  const [messageO, setMessageO] = useState(1);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  const intervalID = useRef(0);
  const messageIntervalID = useRef(0);

  // this variable keeps track of total # of spawned bugs
  // also sets the id for a newest spawned bug
  const numSpawnedBugs = useRef(0);

  useEffect(() => {
    firestore.collection("users/"+props.userID+"/progress").doc("bugGame")
    .get()
    .then((doc) => {
      if (doc.exists) {
        setCorrectBugs(doc?.data()?.Progress);
        if (doc?.data()?.Progress >= TARGET_CORRECT_GUESSES) {
          setHasWon(true);
        }
      }
    })
  },[props.userID])

  // component did mount
  useEffect(() => {
    // create a new bug and give it a unique index

    const spawnNewBug = () => {
      // if (n > UPPER_COUNT) return
      if (bugIds.length >= UPPER_BUG_COUNT) {
        return;
      } else {
        numSpawnedBugs.current += 1;
        setBugIds((prevState) => {
          return [...prevState, numSpawnedBugs.current];
        });
      }
    };

    intervalID.current = window.setInterval(spawnNewBug, 1000);

    return () => {
      clearInterval(intervalID.current);
    };
  }, [bugIds, numSpawnedBugs]);

  useEffect(() => {
    // makes the text rise

    const handleText = () => {
      setMessageO((o)=>o-0.01)
      setMessageY((y)=>y-0.5)
    };

    messageIntervalID.current = window.setInterval(handleText, 100);

    return () => {
      clearInterval(intervalID.current);
    };
  }, [bugIds, numSpawnedBugs]);

  /**
   * toggles the render state of modal component
   */
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  /**
   * Delivers info about current clicked bug to Modal and removes the bug from screen
   *
   * @param bugId - the id of the bug so that it can be deleted from bugs array
   */
  const handleBug = (bugType: string, bugId: number, x: number, y:number) => {
    console.log("clicked")

    setSquashing(true);
    setTimeout(()=>{setSquashing(false);},300);

    setTimeout(()=>{
      setMessageText(BUGS[bugType].isFriendly ? "Oops!" : "Nice!");
      setMessageX(x+75);
      setMessageY(y);
      setMessageO(1);
    },300);

    if (BUGS[bugType]) {
      if (!BUGS[bugType].isFriendly) {
        if (!hasWon) {
          setCorrectBugs((prevState) => 
            prevState + 1
          );
          if (correctBugs + 1 === TARGET_CORRECT_GUESSES) {
            setHasWon(true);
          }
        }
      } else {
        setCorrectBugs((prevState) => 
        prevState - 3
      );
      }
    }

    // removes the bug from bugIds array so that it is no longer rendered
    let newBugs = bugIds;
    for (let i = 0; i < bugIds.length; i++) {
      if (bugIds[i] === bugId) {
        newBugs.splice(i, 1);
      }
    }

    setBugIds(newBugs);
  };

  /**
   * gets a unique index (hash) for a given id
   * @param id : id of the bug that was clicked
   * @returns a random bugType unique to the id
   */
  const getRandomBug = (id: number) => {
    // for ultimate difficulty :p
    // const randomNum: number = Math.floor(3 * Math.random());

    // generate a random index for the id
    const randomBugTypeIndex = id % bugTypes.length;

    return bugTypes[randomBugTypeIndex];
  };

  const handleQuit = () => {
    saveProgress("bugGame",props.userID,correctBugs)
    if (correctBugs===15) {
      addMedal("Squash the bugs!",props.userID,"gold")
    } else if (correctBugs>=10) {
      addMedal("Squash the bugs!",props.userID,"silver")
    } else if (correctBugs>=5) {
      addMedal("Squash the bugs!",props.userID,"bronze")
    }
  }

  // render
  return (
    <>
      <Link to="/home" className="z-20 absolute top-4 left-8">
        <button onClick={handleQuit}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          type="button"
        >
          Home
        </button>
      </Link>
      <Link to="/buglesson" className="z-20 absolute top-4 right-8">
        <button
          onClick={handleQuit}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          type="button"
        >
          Teach Me
        </button>
      </Link>

      <div className="absolute top-0 left-0 z-10">
        <svg className="w-screen h-screen">
        <foreignObject x={VIEW_WIDTH/2-780} y={VIEW_HEIGHT/2-900} width={1800} height={1800}>
          <img
            height={1800}
            width={1800}
            src={leafImg}
            alt={`leaf`}
          />
        </foreignObject>
          {bugIds.map((id) => {
            return (
              <Bug
                key={id}
                id={id}
                bugType={getRandomBug(id)}
                handleBug={handleBug}
              />
            );
          })}
        <text className="text-3xl text-white font-bold" x={messageX} y={messageY} opacity={messageO}>{messageText}</text>
        <Paw squashing={squashing}/>
        </svg>
      </div>

      <div className="absolute top-16 left-16 z-10">
        <ProgressBar
          barLength={400}
          progressPercent={correctBugs / TARGET_CORRECT_GUESSES}
        />
      </div>

      <img
        className="w-screen h-screen z-0 filter blur-sm"
        src={backgroundImg}
        alt="background"
      />
    </>
  );
};

export default Game;
