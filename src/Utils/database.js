import firebase from 'react-native-firebase';

export function changeTransactionStatus(id, status, car) {
  console.log(car);
  firebase
    .database()
    .ref(`scanQRCode/${id}`)
    .set({
      _id: id,
      status,
      car,
    });
}
