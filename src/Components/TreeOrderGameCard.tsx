import React from "react";

interface TreeOrderGameCardProps {
  imgSrc: string;
  body: string;
}

export const TreeOrderGameCard: React.FC<TreeOrderGameCardProps> = (props) => {
  return (
    <div className="flex flex-row gap-2 max-w-screen-md">
      <div className="">
        <img
          className="block max-w-32 max-h-32 w-auto h-auto rounded-lg shadow-lg border-green-200 border-4"
          src={props.imgSrc}
          alt=""
        />
      </div>
      <div className="flex flex-col rounded-lg shadow-lg border-green-200 border-4">
        <p className="px-6 py-2 w-64 m-auto">{props.body}</p>
      </div>
    </div>
  );
};
