// export function getUser(callback) {
//   return async dispatch => {
//     try {
//       dispatch({
//         type: GET_USER_REQUEST
//       });
//       const result = await query({ endpoint: '/user' });
//       if (result.status === 200) {
//         dispatch({
//           type: GET_USER_SUCCESS,
//           payload: result.data.list
//         });
//         callback();
//       } else {
//         callback();
//         dispatch({
//           type: GET_USER_FAILURE
//         });
//       }
//     } catch (error) {
//       callback();
//       dispatch({
//         type: GET_USER_FAILURE
//       });
//     }
//   };
// }
