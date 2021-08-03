import React from "react";
import { DraggableTree } from "./DraggableTree";
import { Droppable } from "react-beautiful-dnd";

interface DroppableColumnProps {
  // treeShapeCol: TreeShapeCol;
  id: string;
  name: string;
  trees: Tree[];
  backgroundStyle: string;
}

interface TreeShapeCol {
  id: string;
  name: string;
  currentTreeIds: string[];
  targetTreeIds: string[];
  backgroundStyle: string;
}

interface Tree {
  id: string;
  name: string;
  imgUrl: string;
}

export const DroppableColumn: React.FC<DroppableColumnProps> = (props) => {
  return (
    <>
      <div
        className={`${props.backgroundStyle} container border-solid border-4 rounded-md border-gray-400 m-8 flex flex-col w-96`}
      >
        <div className="title p-8 text-center font-semibold">{props.name}</div>
        <Droppable droppableId={props.id}>
          {(provided) => (
            <div
              className="tree-list p-8 flex-grow min-h-100px"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.trees.map((tree, index) => {
                return (
                  <DraggableTree key={tree.id} tree={tree} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};
