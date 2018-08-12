const initialState = {
  user: {},
  poolSaved: false,
  lastPoolId: null
};

function createPoolReducer(reduxState = initialState, action) {
  switch (action.type) {
    case "UPDATE_COMPONENT_AFTER_POOL_CREATED":
      return {
        ...reduxState,
        poolSaved: true,
        lastPoolId: action.poolId
      };

    case "CLEAR_POOL_IN_CREATE_POOL":
      return {
        ...reduxState,
        poolSaved: false,
        lastPoolId: null
      };

    default:
      return reduxState;
  }
}

export default createPoolReducer;
