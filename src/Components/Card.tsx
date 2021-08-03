import React from "react";
import ".././index.css";
import { Link } from "react-router-dom";

interface CardProps {
  activePage: number;
  imgUrl: string;
  cardTitle: string;
  cardBody: string;
  bodyImgs?: string[];
  onClickNext: () => void;
  onClickPrev: () => void;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  gameLink?: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center my-16">
      <div className="lg:w-1/3 w-full lg:pr-3">
        <div className="bg-gray-200 rounded-xl shadow-xl">
          <img
            className="object-cover h-64 w-full rounded-t-xl"
            src={props.imgUrl}
            alt=""
          />
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">{props.cardTitle}</h2>
            <div className="text-gray-800 leading-relaxed mb-6 pt-2">
              {props.cardBody}
            </div>
          </div>
          {/* for body images */}
          {props.bodyImgs ? (
            <div className="flex flex-row items-center justify-center gap-8 mb-8 mx-4">
              {props.bodyImgs.map((bodyImg, index) => {
                return (
                  <img
                    key={index}
                    className="flex-grow rounded-xl"
                    src={bodyImg}
                    alt=""
                  />
                );
              })}
            </div>
          ) : null}
          <div className="border-t-2 border-gray-300 flex items-center justify-between p-8">
            {props.isFirstPage ? null : (
              <button
                type="button"
                onClick={props.onClickPrev}
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
              >
                Prev
              </button>
            )}
            {props.isLastPage ? (
              <Link to={`/${props.gameLink}`}>
                <button
                  type="button"
                  onClick={props.onClickNext}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  Play Game
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={props.onClickNext}
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
