const { socket } = require('.');

const socketDispatch = (dispatch) => {
  if (!socket?.on) return;
  socket?.on('update-image', (data) => {
    dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
    console.log('update-image', data);
  });
  console.log('update-image');
};

export default socketDispatch;
