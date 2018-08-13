import { connect } from "react-redux";
import Createpool from "../components/createpool/Createpool";
import { addNewPool, clearPoolInCreatePool } from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    lastPoolId: reduxState.createPoolReducer.lastPoolId,
    poolSaved: reduxState.createPoolReducer.poolSaved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewPool: (poolName, matchWeek) =>
      dispatch(addNewPool(poolName, matchWeek)),
    resetCreatePoolState: () => dispatch(clearPoolInCreatePool())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Createpool);
