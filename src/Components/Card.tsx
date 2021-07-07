import React from "react";
import ".././index.css";

interface CardProps {
  activePage: number;
  imgUrl: string;
  cardTitle: string;
  cardBody: string;
  onClickNext: () => void;
  onClickPrev: () => void;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center my-16">
      <div className="lg:w-1/3 w-full lg:pr-3">
        <div className="bg-gray-200 rounded-xl shadow-xl">
          <img
            className="object-cover h-64 w-full rounded-t-xl"
            src={`${props.imgUrl}`}
            alt=""
          />
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">{props.cardTitle}</h2>
            <div className="text-gray-800 leading-relaxed mb-6 pt-2">
              {props.cardBody}
            </div>
          </div>
          <div className="border-t-2 border-gray-300 flex items-center justify-between p-8">
            <button
              type="button"
              onClick={props.onClickPrev}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={props.onClickNext}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
