const initialState = {
  user: {},
  selectedPoolId: "",
  selectedPoolWeek: ""
};

function createPoolReducer(reduxState = initialState, action) {
  switch (action.type) {
    case "UPDATE_COMPONENT_AFTER_POOL_CREATED":
      return {
        ...reduxState,
        poolSaved: true,
        selectedPoolId: action.poolId,
        selectedPoolWeek: action.selectedPoolWeek
      };

    default:
      return reduxState;
  }
}

export default createPoolReducer;
