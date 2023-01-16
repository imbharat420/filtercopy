const { socket } = require('.');

const socketDispatch = (dispatch) => {
  if (socket) return;

  let events = {
    ['update-image'](data) {
      dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
    },
  };

  socket.onAny(events);
};

export default socketDispatch;
