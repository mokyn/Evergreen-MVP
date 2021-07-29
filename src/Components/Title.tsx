import Tree from "../images/pinetree.svg";

const Title = () => {
    return (
    <div className="flex items-center justify-center m-8">
            <img alt="logo" src={Tree} className="m-0 w-20 h-50"></img>
            <h1 className="m-0 font-custom text-green-500	font-bold text-5xl">
                Evergreen
            </h1>
    </div>)
}

export default Title;