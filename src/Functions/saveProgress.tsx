import { firestore } from "../firebase";


const saveProgress = (activity: string, userID: string, value: number) => {
    const progressRef = firestore.collection(
      "users/"+userID+"/progress"
    );
    progressRef
      .doc(activity)
      .set({
        Progress: value,
      })
      .then(() => {
        console.log(`${activity} progress set to ${value}`)
      })
  }

export default saveProgress;