import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import {
  TREE_COLUMNS,
  TREE_DATA,
  TreeColumn,
  BackgroundStyle,
} from "../STATIC_DATA/TREE_GAME_DATA";
import { DroppableColumn } from "../Components/DroppableColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import PageProps from "../types/PageProps";
import Confetti from "react-confetti";

interface TreeGameState {
  [TreeColumn.CIRCLE]: string[];
  [TreeColumn.TRIANGLE]: string[];
  [TreeColumn.UNSORTED]: string[];
}

const initialState: TreeGameState = {
  [TreeColumn.CIRCLE]: TREE_COLUMNS[TreeColumn.CIRCLE].currentTreeIds,
  [TreeColumn.TRIANGLE]: TREE_COLUMNS[TreeColumn.TRIANGLE].currentTreeIds,
  [TreeColumn.UNSORTED]: TREE_COLUMNS[TreeColumn.UNSORTED].currentTreeIds,
};

export const TreeGame: React.FC<PageProps> = (props) => {
  const [treeGameState, setTreeGameState] =
    useState<TreeGameState>(initialState);

  // progress states
  const [isCircleTargetReached, setIsCircleTargetReached] = useState(false);
  const [isTriangleTargetReached, setIsTriangleTargetReached] = useState(false);

  /**
   * checks if two arrays contain the same elements
   * @param currentArray array of treeIds currently inside column
   * @param targetArray array of treeIds to be placed inside column
   * @returns boolean
   */
  const compareArrays = (
    currentArray: string[],
    targetArray: string[]
  ): boolean => {
    for (let i = 0; i < targetArray.length; i++) {
      if (!currentArray.includes(targetArray[i])) {
        return false;
      }
    }
    return true;
  };

  /**
   * watches treeGameState and updates the progress states
   */
  useEffect(() => {
    const isTargetReached = (treeColId: string) => {
      const result = compareArrays(
        treeGameState[treeColId],
        TREE_COLUMNS[treeColId].targetTreeIds
      );
      return result;
    };

    setIsCircleTargetReached(isTargetReached(TreeColumn.CIRCLE));
    setIsTriangleTargetReached(isTargetReached(TreeColumn.TRIANGLE));
  }, [treeGameState]);

  /**
   * at first render, checks from database if progress exists and applies it
   */
  useEffect(() => {
    firestore
      .collection("users/" + props.userID + "/progress")
      .doc("treeGame")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTreeGameState({
            [TreeColumn.CIRCLE]: doc.data()?.circle,
            [TreeColumn.TRIANGLE]: doc.data()?.triangle,
            [TreeColumn.UNSORTED]: doc.data()?.unsorted,
          });
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
      .doc("treeGame")
      .set({
        [TreeColumn.CIRCLE]: treeGameState[TreeColumn.CIRCLE],
        [TreeColumn.TRIANGLE]: treeGameState[TreeColumn.TRIANGLE],
        [TreeColumn.UNSORTED]: treeGameState[TreeColumn.UNSORTED],
      })
      .then(() => {
        console.log("Progress Saved");
      });
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startTreeColId = TREE_COLUMNS[source.droppableId].id;
    const endTreeColId = TREE_COLUMNS[destination.droppableId].id;

    console.log(startTreeColId);
    console.log(endTreeColId);

    // if dragging and dropping in same column
    if (startTreeColId === endTreeColId) {
      const newTreeIds = Array.from(treeGameState[startTreeColId]);
      newTreeIds.splice(source.index, 1);
      newTreeIds.splice(destination.index, 0, draggableId);

      const newTreeGameState = {
        ...treeGameState,
        [startTreeColId]: newTreeIds,
      };

      setTreeGameState(newTreeGameState);

      return;
    }

    // moving from one list to another
    const newStartTreeIds = Array.from(treeGameState[startTreeColId]);
    newStartTreeIds.splice(source.index, 1); // remove from the starting list

    const newEndTreeIds = Array.from(treeGameState[endTreeColId]);
    newEndTreeIds.splice(destination.index, 0, draggableId); // insert to ending list

    const newTreeGameState = {
      ...treeGameState,
      [startTreeColId]: newStartTreeIds,
      [endTreeColId]: newEndTreeIds,
    };

    setTreeGameState(newTreeGameState);
    // if I do compareArray() here, the returned result is one step late because React re-renders first
  };
  return (
    <>
      {isCircleTargetReached && isTriangleTargetReached ? <Confetti /> : null}
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
        <Link to="/treeshapelesson">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="button"
            onClick={saveProgress}
          >
            Teach Me
          </button>
        </Link>
      </div>
      <div className="text-center font-custom font-bold text-4xl text-green-800 mt-6 mb-4">
        Drag the trees to their respective column
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row justify-center">
          <DroppableColumn
            id={TreeColumn.CIRCLE}
            name={TREE_COLUMNS[TreeColumn.CIRCLE].name}
            trees={treeGameState[TreeColumn.CIRCLE].map((treeId) => {
              return TREE_DATA[treeId];
            })}
            backgroundStyle={
              isCircleTargetReached
                ? BackgroundStyle.SUCCESS
                : BackgroundStyle.INITIAL
            }
          />
          <DroppableColumn
            id={TreeColumn.UNSORTED}
            name={TREE_COLUMNS[TreeColumn.UNSORTED].name}
            trees={treeGameState[TreeColumn.UNSORTED].map((treeId) => {
              return TREE_DATA[treeId];
            })}
            backgroundStyle={BackgroundStyle.INITIAL}
          />
          <DroppableColumn
            id={TreeColumn.TRIANGLE}
            name={TREE_COLUMNS[TreeColumn.TRIANGLE].name}
            trees={treeGameState[TreeColumn.TRIANGLE].map((treeId) => {
              return TREE_DATA[treeId];
            })}
            backgroundStyle={
              isTriangleTargetReached
                ? BackgroundStyle.SUCCESS
                : BackgroundStyle.INITIAL
            }
          />
        </div>
      </DragDropContext>
    </>
  );
};
