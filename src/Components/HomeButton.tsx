import { Link } from "react-router-dom";

const HomeButton = ()=>{
    return (
        <Link to="/" className="z-20 absolute top-4 left-8">
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="button">Home</button>
        </Link>
    )
}

export default HomeButton;