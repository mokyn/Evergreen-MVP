import React from "react";

interface horizontalCardProps {
  imgSrc: string;
  header: string;
  body: string;
  date: string;
}

const HorizontalCard: React.FC<horizontalCardProps> = (props) => {
  return (
    <div className="flex flex-row gap-4 max-w-screen-md m-6">
      <div className="max-w-xs max-h-xs">
        <img
          className="w-auto h-auto rounded-lg shadow-xl"
          src={props.imgSrc}
          alt=""
        />
      </div>
      <div className="flex flex-col rounded-lg shadow-lg">
        <p className="px-6 py-4 mt-2">{props.header}</p>
        <p className="px-6 py-2">{props.date}</p>
        <p className="px-6 py-2">{props.body}</p>
      </div>
    </div>
  );
};

export default HorizontalCard;
