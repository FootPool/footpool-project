export function fetchPools() {
  return function(dispatch) {
    return fetch("/api/displaypools", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(receivePools(data));
      })
      .catch(error => ({ error: error.message }));
  };
}

export function receivePools(data) {
  return {
    type: "RECEIVE_POOLS",
    pools: data
  };
}

export const validateUserInPool = (userId, poolId) => dispatch => {
  if (!userId) {
    return { type: "__USER_INVALID" };
  }

  if (!poolId) {
    return { type: "__POOL_INVALID" };
  }

  return fetch(`/api/validate/${userId}/${poolId}`)
    .then(res => (res.ok ? res.json() : Promise.reject(res)))
    .then(data => {
      dispatch(updateStateOfValidation(data, poolId));
    })
    .catch(err => console.log(err));
};

export function updateStateOfValidation(data, poolId) {
  return {
    type: "UPDATE_VALIDATION_STATE",
    isValid: data.hasBets,
    poolId
  };
}

export const getFixtures = week => dispatch => {
  return fetch(
    `http://api.football-data.org/v2/competitions/2021/matches?matchday=${week}`,
    {
      headers: {
        "X-Auth-Token": "db40501154f6451aaa0c34fb63296bb1"
      }
    }
  )
    .then(res => (res.ok ? res.json() : Promise.reject(res)))
    .then(data => {
      dispatch(receiveFixtures(data.matches));
    })
    .catch(err => console.log(err));
};

export function receiveFixtures(matches) {
  return {
    type: "RECEIVE_FIXTURES",
    matches
  };
}

export const sendBetsToDb = (poolId, userId, guesses) => dispatch => {
  return fetch("/api/placebet", {
    method: "POST",
    body: JSON.stringify({ userId, poolId, guesses }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  }).then(response => {
    if (response.status === 200) {
      dispatch(updateComponentAfterPlacingBets(response));
    } else {
      alert("That hit the post (in a bad way).");
    }
  });
};

export function updateComponentAfterPlacingBets() {
  return {
    type: "UPDATE_COMPONENT_AFTER_BETS"
  };
}

export const addNewPool = (poolName, matchWeek) => dispatch => {
  fetch("/api/pool", {
    method: "POST",
    body: JSON.stringify({ poolName, matchWeek }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("Sorry, your pool was offside. Try again.");
      }
    })
    .then(data => {
      dispatch(updateComponentAfterCreatingPool(data, poolName, matchWeek));
    })
    .catch(error => {
      alert("Sorry, your pool was offside. Try again.");
    });
};

export function updateComponentAfterCreatingPool(data, poolName, matchWeek) {
  return {
    type: "UPDATE_COMPONENT_AFTER_POOL_CREATED",
    poolId: data.poolId,
    poolName,
    matchWeek
  };
}

export function clearPoolInCreatePool() {
  return {
    type: "CLEAR_POOL_IN_CREATE_POOL"
  };
}

export function clearPoolDetail() {
  return {
    type: "CLEAR_POOL_DETAIL"
  };
}
