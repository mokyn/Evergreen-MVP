import React, { useState } from "react";
import { firestore, storage } from "../firebase";
import imageCompression from "browser-image-compression";

interface AddEntryFormProps {
  showForm: boolean;
  onToggleForm: () => void;
  nextEntryNum: number;
  setNextEntryNum: React.Dispatch<React.SetStateAction<number>>;
  favTreeId: string;
  userID: string;
}

export const AddEntryForm: React.FC<AddEntryFormProps> = (props) => {
  // handling form input with states
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState("Not started");
  const [checkboxes, setCheckBoxes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // TODO: find out what type event is
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: any) => {
    setBody(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };

  const handleCheck = (event: any) => {
    var changed = checkboxes;
    changed[event.target.id] = event.target.checked;
    setCheckBoxes(changed);
    console.log(checkboxes);
  };

  const handleImage = (event: any) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      return;
    }

    const imageRef = storage.ref(
      props.userID + `/favTrees/${props.favTreeId}/entry${props.nextEntryNum}`
    );

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedImage = await imageCompression(image, options);

    const imageUploadTask = imageRef.put(compressedImage);
    imageUploadTask.on(
      // something in declare namespace firebase.functions inside index.d.ts conflit with snapshot and error below
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        console.log("successfully uploaded");
        setUploadStatus("success");
      }
    );
  };

  /**
   * Create a new doc with nextEntryNum and
   * write to Firestore with data from form inputs
   */
  const onSubmit = () => {
    const favTreesRef = firestore.collection(
      `users/` + props.userID + `/favTrees/${props.favTreeId}/entries`
    ); // '/entries' collection doesn't exist yet but automatically gets added
    favTreesRef
      .doc(`entry${props.nextEntryNum}`)
      .set({
        Body: body,
        Title: title,
        Date: date,
        Checks: checkboxes,
        entryId: props.nextEntryNum,
      })
      .then(() => {
        console.log("successfully submitted");
        setBody("");
        setTitle("");
        // no need to set nextEntryNum here since treeJournal listens to database in realtime and runs its useEffect.
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
                <div className="mb-0">
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
                <div className="mb-0">
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
                <div className="flex flex-col">
                  <div className="grid grid-cols-4 mb-2">
                    <div className="flex flex-row">
                      <input
                        className="m-2"
                        type="checkbox"
                        id="0"
                        name="leafColor"
                        value="leafColor"
                        onChange={handleCheck}
                      ></input>
                      <label htmlFor="leafColor">
                        Did the leaves change color since last time?
                      </label>
                    </div>
                    <div className="flex flex-row">
                      <input
                        className="m-2"
                        type="checkbox"
                        id="1"
                        name="bugs"
                        value="bugs"
                        onChange={handleCheck}
                      ></input>
                      <label htmlFor="leafColor">
                        Do you see any bugs in the tree?
                      </label>
                    </div>
                    <div className="flex flex-row">
                      <input
                        className="m-2"
                        type="checkbox"
                        id="2"
                        name="birds"
                        value="birds"
                        onChange={handleCheck}
                      ></input>
                      <label htmlFor="leafColor">
                        Do you see any birds or animals?
                      </label>
                    </div>
                    <div className="flex flex-row">
                      <input
                        className="m-2"
                        type="checkbox"
                        id="3"
                        name="loseLeaves"
                        value="loseLeaves"
                        onChange={handleCheck}
                      ></input>
                      <label htmlFor="leafColor">
                        Did your tree lose its leaves?
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 mb-2">
                    <div className="flex flex-row">
                      <input
                        className="m-2"
                        type="checkbox"
                        id="4"
                        name="newLeaves"
                        value="newLeaves"
                        onChange={handleCheck}
                      ></input>
                      <label htmlFor="leafColor">
                        Do you see any new leaves or flowers?
                      </label>
                    </div>
                    <div className="flex flex-row">
                      <input
                        className="m-2"
                        type="checkbox"
                        id="5"
                        name="brokenBranches"
                        value="brokenBranches"
                        onChange={handleCheck}
                      ></input>
                      <label htmlFor="leafColor">Any broken branches?</label>
                    </div>
                    <div className="flex flex-row">
                      <input
                        className="m-2"
                        type="checkbox"
                        id="6"
                        name="holes"
                        value="holes"
                        onChange={handleCheck}
                      ></input>
                      <label htmlFor="leafColor">Any holes in the tree?</label>
                    </div>
                  </div>
                </div>
                <div className="mb-0">
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
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-4"
                    htmlFor="image"
                  >
                    Upload an image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImage}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                    type="button"
                    onClick={handleImageUpload}
                  >
                    Upload
                  </button>
                  <div>Upload Status: {uploadStatus}</div>
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
