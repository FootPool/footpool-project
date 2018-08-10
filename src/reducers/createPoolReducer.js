const initialState = {
  user: {},
  selectedPoolId: ""
};

function createPoolReducer(reduxState = initialState, action) {
  switch (action.type) {
    case "UPDATE_COMPONENT_AFTER_POOL_CREATED":
      return { ...state, poolSaved: true, selectedPoolId: action.poolId };

    default:
      return reduxState;
  }
}

export default createPoolReducer;
