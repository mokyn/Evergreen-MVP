import React from "react";

interface horizontalCardProps {
  imgSrc: string;
  header: string;
  body: string;
  date: string;
  checks: boolean[];
  onDelete: () => void;
}

const HorizontalCard: React.FC<horizontalCardProps> = (props) => {
  let descriptions = ["Leaves changed", "Bugs present", "Birds present", "Leaves lost", "New leaves/flowers", "Has broken branches", "Has holes"]
  let checkDesc:string[] = []
  for (let i=0; i<7; i++) {
    if (props.checks[i]) {
      checkDesc.push(descriptions[i])
    }
  }
  return (
    <div className="flex flex-row gap-4 max-w-screen-md m-6">
      <div className="">
        <img
          className="block max-w-64 max-h-64 w-auto h-auto rounded-lg shadow-xl"
          src={props.imgSrc}
          alt=""
        />
      </div>
      <div className="flex flex-col rounded-lg shadow-lg">
        <p className="px-6 py-4 mt-2">{props.header}</p>
        <p className="px-6 py-2">{props.date}</p>
        <p className="px-6 py-2">{props.body}</p>
        <ul className="ml-4 px-6 py-2 list-disc text-xs">
          {checkDesc.map((desc)=>{return (<li key={desc}>{desc}</li>)})}
        </ul>
        <div className="flex justify-end items-end mx-6 py-4">
          <button
            onClick={props.onDelete}
            className="w-32 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
