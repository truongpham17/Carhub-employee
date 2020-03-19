import firebase from 'react-native-firebase';

export function changeTransactionStatus(id, status, employeeID) {
  firebase
    .database()
    .ref(`scanQRCode/${id}`)
    .set({
      _id: id,
      status,
      employeeID,
    });
}
