import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import HorizontalCard from "../Components/HorizontalCard";
import { firestore } from "../firebase";

interface AddEntryFormProps {
  showForm: boolean;
  onToggleForm: () => void;
  nextEntryNum: number;
  setNextEntryNum: React.Dispatch<React.SetStateAction<number>>;
}

const AddEntryForm: React.FC<AddEntryFormProps> = (props) => {
  // handling form input with states
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: any) => {
    setBody(event.target.value);
  };

  /**
   * Create a new doc with nextEntryNum and
   * write to Firestore with data from form inputs
   */
  const onSubmit = () => {
    const favTreesRef = firestore.collection(
      "users/htoo/favTrees/favTree1/entries"
    );
    favTreesRef
      .doc(`entry${props.nextEntryNum}`)
      .set({
        Body: body,
        Title: title,
      })
      .then(() => {
        console.log("successfully submitted");
        setBody("");
        setTitle("");
        props.setNextEntryNum((prevState) => prevState + 1);
        props.onToggleForm();
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

  const [existingEntries, setExistingEntries] = useState<
    firebase.firestore.DocumentData[]
  >([]); // existingEntries cannot be initialized as just any array so I grabbed the specific array type from the eslint error popup

  const [nextEntryNum, setNextEntryNum] = useState(0); // nextEntryNum is passed into child component and also updated from the child component

  const onToggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  useEffect(() => {
    // console.log("useEffect run");
    // reads the existing entries from firestore, renders them, sets nextEntryNum
    firestore
      .collection("users/htoo/favTrees/favTree1/entries")
      .get()
      .then((snapshot) => {
        setExistingEntries(snapshot.docs.map((doc) => doc.data()));
      })
      .then(() => {
        setNextEntryNum(existingEntries.length);
        // console.log(nextEntryNum);
      });
  }, [existingEntries.length, nextEntryNum]);

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
      <AddEntryForm
        showForm={showForm}
        onToggleForm={onToggleForm}
        nextEntryNum={nextEntryNum}
        setNextEntryNum={setNextEntryNum}
      />
      <div>
        {existingEntries.map((exisitingEntry: any) => {
          return (
            <div className="flex flex-col gap-6 w-screen justify-center items-center">
              <HorizontalCard
                imgSrc="https://images.unsplash.com/photo-1521062849558-8e32f69ba41d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                header={exisitingEntry.Title}
                body={exisitingEntry.Body}
                date="January 01, 2021"
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
