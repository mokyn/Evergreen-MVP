import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface DraggableTreeProps {
  key: string;
  index: number;
  tree: Tree;
}

interface Tree {
  id: string;
  name: string;
  imgUrl: string;
}

export const DraggableTree: React.FC<DraggableTreeProps> = (props) => {
  return (
    <>
      <Draggable draggableId={props.tree.id} index={props.index}>
        {(provided) => (
          <div
            className="p-4 border-gray-400 border-solid border-4 rounded-md mb-4 bg-white"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <img src={props.tree.imgUrl} alt="" />
          </div>
        )}
      </Draggable>
    </>
  );
};
