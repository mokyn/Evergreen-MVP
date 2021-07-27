
import { Link } from "react-router-dom";
import triangle1 from "../images/TreeShapes/Picture1.png"
import triangle2 from "../images/TreeShapes/Picture2.png"
import triangle3 from "../images/TreeShapes/Picture3.png"
import triangle4 from "../images/TreeShapes/Picture4.png"


const TreeShapes = () => {
    return (
        <div>
            <Link to="/home" className="z-20 absolute top-4 left-8">
                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button">Home</button>
            </Link>
            <h1 className="m-8 font-custom text-green-500 font-bold text-5xl text-center">Lesson: Tree Shapes!</h1>

            <p className="text-lg mx-8 mb-2">Trees can take many different shapes, such as:</p>
            <ol className="text-lg mx-16 list-disc">
                <li>Triangles</li>
                <li>Circles</li>
                <li>Weeping</li>
                <li>Palm Shape</li>
                <li>& more!</li>
            </ol>
            <div className="flex m-10 gap-2">
                <img alt="trianglular tree" src={triangle1}></img>
                <img alt="trianglular tree" src={triangle2}></img>
                <img alt="trianglular tree" src={triangle3}></img>
                <img alt="trianglular tree" src={triangle4}></img>
            </div>
        </div>
    )
}

export default TreeShapes;