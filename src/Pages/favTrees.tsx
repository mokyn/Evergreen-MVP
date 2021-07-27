import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore, storage } from "../firebase";
import firebase from "firebase/app";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import FavTreeCard from "../Components/FavTreeCard";
import TreeJournal from "./treeJournal";
import { AddTreeForm } from "../Components/AddTreeForm";

const FavTreesMenu = () => {
  const [isFormShown, setIsFormShown] = useState(false);
  const [existingTrees, setExistingTrees] = useState<
    firebase.firestore.DocumentData[]
  >([]);
  const [nextTreeNum, setNextTreeId] = useState(0);
  const { url } = useRouteMatch();
  const [imgUrl, setImgUrl] = useState<{ [key: string]: string }>({});

  //   console.log(url) = '/fav-tree/'

  // listen to changes in firestore database
  useEffect(() => {
    firestore.collection("users/htoo/favTrees").onSnapshot((snapshot) => {
      const existingTreesArray = snapshot.docs.map((doc) => doc.data());
      setExistingTrees(existingTreesArray);
    });
  }, []);

  // set nextTreeId
  useEffect(() => {
    // to make sure there is no memory leak error, first check if existingTrees array exists at all
    if (existingTrees.length === 0) {
      setNextTreeId(0);
    } else {
      const nextTreeId = existingTrees[existingTrees.length - 1].favTreeId + 1;
      setNextTreeId(nextTreeId);
    }
  }, [existingTrees]);

  // grabs images for trees and set the imgUrl state
  useEffect(() => {
    existingTrees.map((existingTree: firebase.firestore.DocumentData) => {
      grabImgURL(existingTree.favTreeId).then((url) => {
        setImgUrl((prevState) => {
          return { ...prevState, [`favTree${existingTree.favTreeId}`]: url };
        });
      });
      return null;
    });
  }, [existingTrees]);

  const handleToggleForm = () => {
    setIsFormShown((prevState) => !prevState);
  };

  // grabs img from Storage
  const grabImgURL = async (favTreeId: number) => {
    const imgRef = storage.ref(`htoo/favTrees/favTree${favTreeId}`);
    return await imgRef.getDownloadURL();
  };

  const handleDelete = (treeId: string) => {
    const treeRef = firestore.doc(`users/htoo/favTrees/${treeId}`);
    const treeImgRef = storage.ref(`htoo/favTrees/${treeId}`);

    treeRef
      .delete()
      .then(() => {
        console.log("successfully deleted");
      })
      .catch((error) => {
        console.log("Uh oh, couldn't delete!");
      });

    treeImgRef
      .delete()
      .then(() => {
        console.log("successfully deleted tree image");
      })
      .catch((error) => {
        console.log("Uh oh, couldn't delete tree image!");
      });
  };

  return (
    <>
      <AddTreeForm
        isFormShown={isFormShown}
        onToggleForm={handleToggleForm}
        nextTreeNum={nextTreeNum}
        setNextTreeId={setNextTreeId}
      />
      <div className="main-container flex flex-col justify-center items-center h-screen w-screen gap-12">
        <div className="menu-container flex flex-row justify-center gap-12">
          {existingTrees.map(
            (existingTree: firebase.firestore.DocumentData) => {
              return (
                <>
                  <div className="flex flex-col items-center justify-center gap-0">
                    <Link
                      to={`${url}/favTree${existingTree.favTreeId}`}
                      key={existingTree.favTreeId}
                    >
                      <FavTreeCard
                        imgUrl={imgUrl[`favTree${existingTree.favTreeId}`]}
                        cardTitle={existingTree.name}
                      />
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(`favTree${existingTree.favTreeId}`)
                      }
                      className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              );
            }
          )}
        </div>
        <div>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white font-bold mt-4 py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            onClick={handleToggleForm}
          >
            Add a new tree
          </button>
        </div>
      </div>
    </>
  );
};

const FavTrees = () => {
  const { path } = useRouteMatch();
  //   console.log(path) = '/fav-tree'

  return (
    <>
      <Router>
        <Switch>
          <Route exact path={`${path}`}>
            <FavTreesMenu />
          </Route>
          <Route path={`${path}/:favTreeId`}>
            <TreeJournal />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default FavTrees;
