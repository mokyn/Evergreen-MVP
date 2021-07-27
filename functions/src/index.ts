import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// const firebase = admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// export const deletePhotos = (favTreeId: string) => {
//   functions.firestore
//     .document(`users/htoo/favTrees/${favTreeId}`)
//     .onDelete((snap, context) => {
//       const { favTreeId } = context.params;
//       const bucket = firebase.storage().bucket();

//       return bucket.deleteFiles({
//         prefix: `htoo/favTrees/${favTreeId}`,
//       });
//     });
// };

// export const deletePhotos = () =>
//   functions.https.onCall((data, context) => {
//     const bucket = firebase.storage().bucket();

//     return bucket.deleteFiles({
//       prefix: `htoo/favTrees/${favTreeId}`,
//     });
//   });

export const sayHello = functions.https.onCall((data, context) => {
  return `Hello, ${data.name}.`;
  // note that you cant console log here because this is backend code
});
