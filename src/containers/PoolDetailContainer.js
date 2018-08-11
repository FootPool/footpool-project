import { connect } from "react-redux";
import Pooldetail from "../components/pooldetails/Pooldetail";
import {
  validateUserInPool,
  getFixtures,
  sendBetsToDb
} from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    selectedPool: reduxState.selectedPool,
    pools: reduxState.pools.pools,
    selectedPoolId: reduxState.pools.selectedPoolId,
    selectedPoolWeek: reduxState.pools.selectedPoolWeek,
    isValid: reduxState.poolDetails[reduxState.pools.selectedPoolId],
    showModal: reduxState.poolDetails.showModal,
    matches: reduxState.poolDetails.matches,
    isValid: reduxState.poolDetails.isValid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    validateUserInPool: (userId, poolId) =>
      dispatch(validateUserInPool(userId, poolId)),
    getFixtures: week => dispatch(getFixtures(week)),
    sendBetsToDb: (poolId, userId, guesses) =>
      dispatch(sendBetsToDb(poolId, userId, guesses))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pooldetail);
