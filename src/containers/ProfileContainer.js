import { connect } from "react-redux";
import Profile from "../components/profile/Profile";
import /* ACTIONS */ "../actions/index";

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // ACTIONS
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
