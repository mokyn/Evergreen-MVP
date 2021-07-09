import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import HorizontalCard from "../Components/HorizontalCard";
import { firestore } from "../firebase";

interface entryContentsType {
  header: string;
  body: string;
  imgSrc: string;
  date: string;
}

const ENTRY_CONTENTS: { [key: string]: entryContentsType } = {
  1: {
    header: "Heading One",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aperiam quod distinctio. Earum, saepe nam.",
    date: "January 1, 2021",
    imgSrc:
      "https://images.unsplash.com/photo-1482148454461-aaedae4b30bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
};

const entryIds = Object.keys(ENTRY_CONTENTS);

interface AddEntryFormProps {
  showForm: boolean;
  onToggleForm: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleBodyChange = (event: any) => {
    setBody(event.target.value);
  };

  const onSubmit = () => {
    const favTreesRef = firestore.collection(
      "users/htoo/favTrees/favTree1/entries"
    );
    favTreesRef
      .doc(`entry2`)
      .set({
        Body: body,
        Title: title,
      })
      .then(() => {
        console.log("successfully submitted");
        setBody("");
        setTitle("");
      });
  };

  if (props.showForm) {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add an entry</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-30 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={props.onToggleForm}
                >
                  <span>×</span>
                </button>
              </div>
              {/*body*/}
              <form action="" className="flex flex-col gap-4 m-5">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Add a catchy title.."
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="body"
                  >
                    Notes
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="body"
                    id="body"
                    cols={30}
                    rows={5}
                    placeholder="Write down some observations..."
                    value={body}
                    onChange={handleBodyChange}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Date of entry:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    id="date"
                  />
                </div>
              </form>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={props.onToggleForm}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                  type="button"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  } else {
    return null;
  }
};

const TreeJournal: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [nextEntryNum, setNextEntryNum] = useState(2);

  const onToggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  //   const getAge = () => {
  //     const docRef = firestore.doc("users/htoo");
  //     docRef.get().then((doc) => {
  //       if (doc && doc.exists) {
  //         const userData = doc.data();
  //         setTempArray(userData.age);
  //       }
  //     });
  //   };

  return (
    <>
      <AddEntryForm showForm={showForm} onToggleForm={onToggleForm} />
      <div>
        {entryIds.map((entryId) => {
          return (
            <div className="flex flex-col gap-6 w-screen justify-center items-center">
              <HorizontalCard
                imgSrc={ENTRY_CONTENTS[entryId].imgSrc}
                header={ENTRY_CONTENTS[entryId].header}
                body={ENTRY_CONTENTS[entryId].body}
                date={ENTRY_CONTENTS[entryId].date}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="bg-green-500 hover:bg-green-400 text-white font-bold mt-4 py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          onClick={onToggleForm}
        >
          Add Entry
        </button>
      </div>
    </>
  );
};

export default TreeJournal;
