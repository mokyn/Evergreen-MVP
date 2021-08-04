import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { BUG_LESSON_DATA } from "../STATIC_DATA/BUG_LESSON_DATA";
import { firestore } from "../firebase";
import "../index.css";

const PAGE_NUMS = Object.keys(BUG_LESSON_DATA);

interface BugLessonProps {
  userID: string;
}

const BugLesson: React.FC<BugLessonProps> = (props) => {
  const [activePage, setActivePage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false); // these two states are used to conditionally render prev/ next buttons inside Card

  // when card re-renders, check active page state and update other states accordingly
  useEffect(() => {
    if (activePage === 0) {
      setIsFirstPage(true);
      setIsLastPage(false);
    } else if (activePage === PAGE_NUMS.length - 1) {
      setIsLastPage(true);
      setIsFirstPage(false);
    } else {
      setIsFirstPage(false);
      setIsLastPage(false);
      return;
    }
  }, [activePage]);

  // checks from database if progress exists and applies it
  useEffect(() => {
    firestore
      .collection("users/" + props.userID + "/progress")
      .doc("bugLesson")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setActivePage(doc?.data()?.Progress);
        }
      });
  }, [props.userID]);

  // function that saves progress to firebase
  const saveProgress = () => {
    const progressRef = firestore.collection(
      "users/" + props.userID + "/progress"
    );
    progressRef
      .doc("bugLesson")
      .set({
        Progress: activePage,
      })
      .then(() => {
        console.log("Progress Saved");
      });
  };

  const handlePageUp = () => {
    // handles edge case
    if (activePage + 1 >= PAGE_NUMS.length) {
      return;
    } else {
      setActivePage((prevState) => prevState + 1);
    }
  };

  const handlePageDown = () => {
    if (activePage - 1 < 0) {
      return;
    } else {
      setActivePage((prevState) => prevState - 1);
    }
  };

  // console.log(activePage);

  return (
    <>
      <div className="p-4 pb-0 flex flex-row gap-6">
        <Link to="/home">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
            onClick={saveProgress}
          >
            Home
          </button>
        </Link>
        <Link to="/buggame">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
            onClick={saveProgress}
          >
            Play Game
          </button>
        </Link>
      </div>
      <Card
        activePage={activePage}
        onClickNext={handlePageUp}
        onClickPrev={handlePageDown}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        imgUrl={BUG_LESSON_DATA[PAGE_NUMS[activePage]].imgUrl}
        cardTitle={BUG_LESSON_DATA[PAGE_NUMS[activePage]].cardTitle}
        cardBody={BUG_LESSON_DATA[PAGE_NUMS[activePage]].cardBody}
        bodyImgs={BUG_LESSON_DATA[PAGE_NUMS[activePage]].bodyImgs}
        gameLink="buggame"
      />
    </>
  );
};

export default BugLesson;
