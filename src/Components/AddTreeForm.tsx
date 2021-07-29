import React, { ChangeEvent, useState } from "react";
import { firestore, storage } from "../firebase";
import imageCompression from "browser-image-compression";

interface AddTreeFormProps {
  isFormShown: boolean;
  onToggleForm: () => void;
  nextTreeNum: number;
  setNextTreeId: React.Dispatch<React.SetStateAction<number>>;
  userID: string;
}

export const AddTreeForm: React.FC<AddTreeFormProps> = (props) => {
  // handling form input with states
  const [name, setName] = useState("");
  const [image, setImage] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState("Not started");

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      // perform null check
      // optional chaining
      return;
    }
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      return;
    }

    const imageRef = storage.ref(props.userID+`/favTrees/favTree${props.nextTreeNum}`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedImage = await imageCompression(image, options);

    const imageUploadTask = imageRef.put(compressedImage);
    imageUploadTask.on(
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
   * Create a new doc with nextTreeNum and
   * write to Firestore with data from form inputs
   */
  const onSubmit = () => {
    const favTreesRef = firestore.collection("users/"+props.userID+"/favTrees");
    favTreesRef
      .doc(`favTree${props.nextTreeNum}`)
      .set({
        name: name,
        favTreeId: props.nextTreeNum,
      })
      .then(() => {
        console.log("successfully submitted");
        setName("");
        props.setNextTreeId((prevState) => prevState + 1);
        props.onToggleForm();
        setUploadStatus("");
      });
  };

  if (props.isFormShown) {
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
                    className="block text-gray-700 text-sm font-bold mb-4"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Give your tree a name.."
                    value={name}
                    onChange={handleNameChange}
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
