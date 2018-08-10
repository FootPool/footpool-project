const initialState = {
  pools: [],
  selectedPoolId: undefined,
  selectedPoolWeek: undefined
};

function choosePoolsReducer(reduxState = initialState, action) {
  switch (action.type) {
    case "RECEIVE_POOLS":
      return Object.assign({}, reduxState, {
        pools: action.pools
      });

    case "JOIN_POOL":
      return Object.assign({}, reduxState, {
        selectedPoolId: action.selectedPoolId,
        selectedPoolWeek: action.selectedPoolWeek
      });

    default:
      return reduxState;
  }
}

export default choosePoolsReducer;
