import React from "react";
import ".././index.css";

interface favTreeCardProps {
  imgUrl: string;
  cardTitle: string;
}

const FavTreeCard: React.FC<favTreeCardProps> = (props) => {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center my-16">
      <div className="lg:w-1/3 w-full lg:pr-3">
        <div className="bg-gray-200 rounded-xl shadow-xl w-64">
          <img
            className="object-cover h-64 w-full rounded-t-xl"
            src={`${props.imgUrl}`}
            alt=""
          />
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">{props.cardTitle}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FavTreeCard;
