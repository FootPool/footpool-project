import { connect } from "react-redux";
import Pooldetail from "../components/pooldetails/Pooldetail";
import {
  validateUserInPool,
  getFixtures,
  sendBetsToDb,
  clearPoolDetail
} from "../actions/index";

const mapStateToProps = (
  reduxState,
  { location: { state: { poolId } = {} } = {} }
) => {
  const pool = reduxState.pools.pools.find(p => p.id === poolId);
  return {
    user: reduxState.user,
    pool,
    isValid: reduxState.poolDetails[poolId],
    showModal: reduxState.poolDetails.showModal,
    matches: reduxState.poolDetails.matches,
    isValid: reduxState.poolDetails.isValid
  };
};

const mapDispatchToProps = {
  validateUserInPool,
  getFixtures,
  sendBetsToDb,
  clearPoolDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pooldetail);
