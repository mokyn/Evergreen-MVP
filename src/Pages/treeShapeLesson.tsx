import React, { useState } from "react";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { TREE_SHAPE_LESSON_DATA } from "../STATIC_DATA/TREE_SHAPE_LESSON_DATA";
import ProgressBar from "../Components/ProgressBar";
import { useEffect } from "react";
import { firestore } from "../firebase";

const PAGE_NUMS = Object.keys(TREE_SHAPE_LESSON_DATA);

interface TreeShapeLessonProps {
  userID: string;
}

export const TreeShapeLesson: React.FC<TreeShapeLessonProps> = (props) => {
  const [activePage, setActivePage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false); // these two states are used to conditionally render prev/ next buttons inside Card

  // when card re-renders, check active page state and update other states accordingly
  useEffect(() => {
    if (activePage === 0) {
      setIsFirstPage(true);
    } else if (activePage === PAGE_NUMS.length - 1) {
      setIsLastPage(true);
    } else {
      setIsFirstPage(false);
      setIsLastPage(false);
      return;
    }
  }, [activePage]);

  /**
   * checks from database if progress exists and applies it
   */
  useEffect(() => {
    firestore
      .collection("users/" + props.userID + "/progress")
      .doc("treeShapeLesson")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setActivePage(doc?.data()?.Progress);
        }
      });
  }, [props.userID]);

  /**
   * function that saves lesson progress to database
   */
  const saveProgress = () => {
    const progressRef = firestore.collection(
      "users/" + props.userID + "/progress"
    );
    progressRef
      .doc("treeShapeLesson")
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
        <Link to="/treegame">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
            onClick={saveProgress}
          >
            Play Game
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Card
          activePage={activePage}
          onClickNext={handlePageUp}
          onClickPrev={handlePageDown}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          imgUrl={TREE_SHAPE_LESSON_DATA[PAGE_NUMS[activePage]].imgUrl}
          cardTitle={TREE_SHAPE_LESSON_DATA[PAGE_NUMS[activePage]].cardTitle}
          cardBody={TREE_SHAPE_LESSON_DATA[PAGE_NUMS[activePage]].cardBody}
          bodyImgs={TREE_SHAPE_LESSON_DATA[PAGE_NUMS[activePage]].bodyImgs}
          gameLink="treegame"
        />

        <ProgressBar
          barLength={400}
          progressPercent={(activePage + 1) / PAGE_NUMS.length}
        />
      </div>
    </>
  );
};