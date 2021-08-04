import { firestore } from "../firebase";


const addMedal = (activity: string, userID: string, value: string) => {
    const progressRef = firestore.collection(
      "users/"+userID+"/achievements"
    );
    progressRef
      .doc(activity)
      .set({
        medal: value,
      })
      .then(() => {
        console.log(`${value} medal added for ${activity}`)
      })
  }

export default addMedal;