import React, { useState } from "react";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import { useEffect } from "react";
import { firestore } from "../firebase";
import { PLANTING_LESSON_DATA } from "../STATIC_DATA/PLANTING_LESSON_DATA";
import PageProps from "../types/PageProps";
import saveProgress from "../Functions/saveProgress";

const PAGE_NUMS = Object.keys(PLANTING_LESSON_DATA);

export const TreePlantingLesson: React.FC<PageProps> = (props) => {
  const [activePage, setActivePage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false); // these two states are used to conditionally render prev/ next buttons inside Card

  /**
   * checks from database if progress exists and applies it
   */
  useEffect(() => {
    // TODO: updates the isfirstpage islastpage states from here
    firestore
      .collection("users/" + props.userID + "/progress")
      .doc("treePlantingLesson")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setActivePage(doc?.data()?.Progress);
        }
      });
  }, [props.userID]);

  // when card re-renders, check active page state and update other states accordingly
  useEffect(() => {
    if (activePage === 0) {
      setIsFirstPage(true);
      setIsLastPage(false);
    } else if (activePage === PAGE_NUMS.length - 1) {
      setIsLastPage(true);
      setIsFirstPage(false); // this might seem redundant but is actually necessary
    } else {
      setIsFirstPage(false);
      setIsLastPage(false);
      return;
    }
  }, [activePage]);

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

  const handleQuit = () => {
    saveProgress("treePlantingLesson", props.userID, activePage);
  };

  // console.log(activePage);

  return (
    <>
      <div className="p-4 pb-0 flex flex-row gap-6">
        <Link to="/home">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
            onClick={handleQuit}
          >
            Home
          </button>
        </Link>
        <Link to="/tree-order-game">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
            onClick={handleQuit}
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
          imgUrl={PLANTING_LESSON_DATA[PAGE_NUMS[activePage]].imgUrl}
          cardTitle={PLANTING_LESSON_DATA[PAGE_NUMS[activePage]].cardTitle}
          cardBody={PLANTING_LESSON_DATA[PAGE_NUMS[activePage]].cardBody}
          bodyImgs={PLANTING_LESSON_DATA[PAGE_NUMS[activePage]].bodyImgs}
          gameLink="tree-order-game"
          saveProgress={handleQuit}
        />

        <ProgressBar
          barLength={400}
          progressPercent={(activePage + 1) / PAGE_NUMS.length}
        />
      </div>
    </>
  );
};
