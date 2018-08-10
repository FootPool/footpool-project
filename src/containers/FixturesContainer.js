import { connect } from "react-redux";
import Fixtures from "../components/fixtures/Fixtures";
import { getFixtures } from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    matches: reduxState.poolDetails.matches
  };
};

const mapDispatchToProps = {
  getFixtures
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fixtures);
