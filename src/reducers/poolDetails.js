const initialState = {
  matches: []
};

function poolDetailReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_VALIDATION_STATE":
      return { ...state, isValid: action.isValid, poolId: action.poolId };

    case "RECEIVE_FIXTURES":
      return { ...state, showModal: true, matches: action.matches };

    case "UPDATE_COMPONENT_AFTER_BETS":
      return { ...state, showModal: false, isValid: true };

    case "CLEAR_POOL_DETAIL":
      return { ...state, showModal: false, isValid: false };

    default:
      return state;
  }
}

export default poolDetailReducer;
