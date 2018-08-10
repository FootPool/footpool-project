import { connect } from "react-redux";
import ChoosePool from "../components/choosepool/ChoosePool";
import { joinPool, fetchPools } from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    selectedPool: reduxState.selectedPool,
    pools: reduxState.pools.pools,
    selectedPoolId: reduxState.pools.selectedPoolId,
    selectedPoolWeek: reduxState.pools.selectedPoolWeek
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPools: () => dispatch(fetchPools()),
    joinPool: pool => dispatch(joinPool(pool))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosePool);
