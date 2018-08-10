import { connect } from "react-redux";
import Createpool from "../components/createpool/Createpool";
import { addNewPool } from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    selectedPoolId: reduxState.createPoolReducer.poolId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewPool: () => dispatch(addNewPool())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Createpool);
