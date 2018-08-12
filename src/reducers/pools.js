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

    case "UPDATE_COMPONENT_AFTER_POOL_CREATED":
      return {
        ...reduxState,
        pools: [
          ...pools,
          {
            id: action.poolId,
            poolname: action.poolName,
            match_week: action.matchWeek
          }
        ]
      };

    default:
      return reduxState;
  }
}

export default choosePoolsReducer;
