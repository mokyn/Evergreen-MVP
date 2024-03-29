import React, { useState } from "react";
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TREE_ORDER_GAME_DATA } from "../STATIC_DATA/TREE_ORDER_GAME_DATA";
import PageProps from "../types/PageProps";
import "../index.css";
import { TreeOrderGameCard } from "../Components/TreeOrderGameCard";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";

const CURRENT_TREE_ORDER: string[] = Object.keys(TREE_ORDER_GAME_DATA);
const TARGET_CORRECT_ORDER = [
  "STEP1",
  "STEP2",
  "STEP3",
  "STEP4",
  "STEP5",
  "STEP6",
];

// helper function to shuffle array
const shuffle = (array) => {
  //  TODO: make sure returned array is never same as target corect
  const shuffledArray = [...array].sort(() => Math.random() - 0.5);
  return shuffledArray;
};

export const TreePlantingOrderGame: React.FC<PageProps> = (props) => {
  const [currentTreeOrder, setCurrentTreeOrder] = useState<string[]>(
    shuffle(CURRENT_TREE_ORDER)
  );
  const [isTargetReached, setIsTargetReached] = useState(false);

  // watches currentTreeOrder and checks progress on every render
  useEffect(() => {
    for (let i = 0; i < currentTreeOrder.length; i++) {
      if (currentTreeOrder[i] !== TARGET_CORRECT_ORDER[i]) {
        setIsTargetReached(false);
        return;
      }
    }
    setIsTargetReached(true);
  }, [currentTreeOrder]);

  /**
   * at first render, checks from database if progress exists and applies it
   */
  useEffect(() => {
    firestore
      .collection("users/" + props.userID + "/progress")
      .doc("treePlantingOrderGame")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentTreeOrder(doc?.data()?.Progress);
        }
      });
  }, [props.userID]);

  /**
   * function that saves game progress to database
   */
  const saveProgress = () => {
    const progressRef = firestore.collection(
      "users/" + props.userID + "/progress"
    );
    progressRef
      .doc("treePlantingOrderGame")
      .set({
        Progress: currentTreeOrder,
      })
      .then(() => {
        console.log("Progress Saved");
      });
  };

  /**
   * Re-shuffles the array of items
   */
  const handleReset = () => {
    setCurrentTreeOrder(shuffle(CURRENT_TREE_ORDER));
  };

  /**
   *
   * @param result object from React-Beautiful-Dnd that contains data about dragged item
   * @returns updates the array order stored in state
   */
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!result.destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const newTreePlantingOrder = Array.from(currentTreeOrder);
    const [reorderedItem] = newTreePlantingOrder.splice(result.source.index, 1); // remove from original position
    newTreePlantingOrder.splice(result.destination.index, 0, reorderedItem); // add to new position

    setCurrentTreeOrder(newTreePlantingOrder);
  };

  return (
    <>
      {isTargetReached ? <Confetti /> : null}
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
        <Link to="/tree-planting-lesson">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
            onClick={saveProgress}
          >
            Teach Me
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-12">
        <header className="text-4xl font-custom mt-8">
          <h1>How to Plant A Tree</h1>
        </header>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="max-w-screen">
            <Droppable droppableId="currentTreeOrder">
              {(provided) => (
                <div
                  className="flex flex-col gap-12"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {currentTreeOrder.map((id, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TreeOrderGameCard
                              imgSrc={TREE_ORDER_GAME_DATA[id].imgUrl}
                              body={TREE_ORDER_GAME_DATA[id].desc}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-400 text-white font-bold mt-4 mb-8 py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </>
  );
};
