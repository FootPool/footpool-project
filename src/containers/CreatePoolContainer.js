import { connect } from "react-redux";
import Createpool from "../components/createpool/Createpool";
import { addNewPool } from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    selectedPoolId: reduxState.createPoolReducer.poolId,
    selectedPoolWeek: reduxState.createPoolReducer.selectedPoolWeek,
    poolSaved: reduxState.createPoolReducer.poolSaved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewPool: (poolName, matchWeek) =>
      dispatch(addNewPool(poolName, matchWeek))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Createpool);
