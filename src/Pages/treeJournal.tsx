import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import HorizontalCard from "../Components/HorizontalCard";
import { firestore, storage } from "../firebase";
import { useParams } from "react-router-dom";
import { AddEntryForm } from "../Components/AddEntryForm";
import PageProps from "../Components/PageProps";

interface RenderedEntriesProps {
  existingEntries: firebase.firestore.DocumentData[];
  showMoreClickCount: number;
  favTreeId: string;
  userID: string;
}

const RenderedEntries: React.FC<RenderedEntriesProps> = (props) => {
  const start = 0;
  const end = 3 * props.showMoreClickCount;
  const [imgUrl, setImgUrl] = useState<{ [key: string]: string }>({});

  const handleDelete = (entryId: string) => {
    const entryRef = firestore.doc(
      `users/${props.userID}/favTrees/${props.favTreeId}/entries/entry${entryId}`
    );
    const entryImgRef = storage.ref(
      `${props.userID}/favTrees/${props.favTreeId}/entry${entryId}`
    );

    entryRef
      .delete()
      .then(() => {
        console.log("successfully deleted");
      })
      .catch((error) => {
        console.log("Uh oh, couldn't delete!");
      });
    entryImgRef
      .delete()
      .then(() => {
        console.log("successfully deleted entry img");
      })
      .catch((error) => {
        console.log("Uh oh, couldn't delete entry img!");
      });
  };

  // grabs the images of rendered entries only to save bandwidth
  useEffect(() => {
    const grabImgURL = async (entryId: string) => {
      const imgRef = storage.ref(
        `${props.userID}/favTrees/${props.favTreeId}/entry${entryId}`
      );
      return await imgRef.getDownloadURL();
    };

    props.existingEntries
      .slice(start, end)
      .map((existingEntry: firebase.firestore.DocumentData) => {
        grabImgURL(existingEntry.entryId).then((url) => {
          setImgUrl((prevState) => {
            return { ...prevState, [existingEntry.entryId]: url };
          });
        });
        return null;
      });
  }, [props.existingEntries, end, props.favTreeId, props.userID]);

  return (
    <div>
      {props.existingEntries
        .slice(start, end)
        .map((exisitingEntry: firebase.firestore.DocumentData) => {
          return (
            <div className="flex flex-col gap-6 w-screen justify-center items-center">
              <HorizontalCard
                imgSrc={imgUrl[exisitingEntry.entryId]}
                header={exisitingEntry.Title}
                body={exisitingEntry.Body}
                date={exisitingEntry.Date}
                onDelete={() => {
                  handleDelete(exisitingEntry.entryId);
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

const TreeJournal: React.FC<PageProps> = (props) => {
  const [showForm, setShowForm] = useState(false);

  const [existingEntries, setExistingEntries] = useState<
    firebase.firestore.DocumentData[]
  >([]); // existingEntries cannot be initialized as just any array so I grabbed the specific array type from the eslint error popup

  const [nextEntryNum, setNextEntryNum] = useState(0); // nextEntryNum is passed into child component and also updated from the child component
  const [showMoreClickCount, setShowMoreClickCount] = useState(1); // number of times show more has been clicked

  const onToggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleShowMore = () => {
    setShowMoreClickCount((prevState) => prevState + 1);
  };

  const { favTreeId } = useParams(); // grabs the favTreeId from URL

  useEffect(() => {
    // console.log("useEffect run");
    // reads the existing entries from firestore, renders them, sets nextEntryNum
    firestore
      .collection(`users/${props.userID}/favTrees/${favTreeId}/entries`)
      .onSnapshot((snapshot) => {
        // existingEntries state only update after adding new entry; api call is efficient
        // renderedEntries render existingEntries based on showMoreClickCount (doesn't call api again)
        const existingEntriesArray = snapshot.docs.map((doc) => doc.data());
        setExistingEntries(existingEntriesArray.reverse()); // reversed to show latest entry on top
      });
  }, [favTreeId, props.userID]);

  // a separate useEffect to set the next entry num which depends on the last entry of existingEntries state array
  useEffect(() => {
    if (existingEntries.length === 0) {
      setNextEntryNum(0);
    } else {
      setNextEntryNum(existingEntries[0].entryId + 1);
    }
  }, [existingEntries]);

  //   const getAge = () => {
  //     const docRef = firestore.doc("users/htoo");
  //     docRef.get().then((doc) => {
  //       if (doc && doc.exists) {
  //         const userData = doc.data();
  //         setTempArray(userData.age);
  //       }
  //     });
  //   }; just sample code for reading from firestore

  return (
    <>
      <div className="flex flex-col box-border overflow-hidden">
        <AddEntryForm
          showForm={showForm}
          onToggleForm={onToggleForm}
          nextEntryNum={nextEntryNum}
          setNextEntryNum={setNextEntryNum}
          favTreeId={favTreeId}
          userID={props.userID}
        />
        <div className="flex justify-center items-center mt-12">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white font-bold mt-4 py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            onClick={onToggleForm}
          >
            Add Entry
          </button>
        </div>
        <RenderedEntries
          existingEntries={existingEntries}
          showMoreClickCount={showMoreClickCount}
          favTreeId={favTreeId}
          userID={props.userID}
        />
        <div className="flex flex-col gap-2 justify-center items-center mb-12">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white font-bold mt-4 py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            onClick={handleShowMore}
          >
            Show More
          </button>
          <div>
            Entries Remaining:{" "}
            {existingEntries.length - 3 * showMoreClickCount > 0
              ? existingEntries.length - 3 * showMoreClickCount
              : 0}
          </div>
        </div>
      </div>
    </>
  );
};

export default TreeJournal;
