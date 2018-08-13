import { connect } from "react-redux";
import ChoosePool from "../components/choosepool/ChoosePool";
import { fetchPools } from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    pools: reduxState.pools.pools
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPools: () => dispatch(fetchPools())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosePool);
