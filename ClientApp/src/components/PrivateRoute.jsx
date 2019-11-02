import React from "react";
import { navigate, Redirect } from "@reach/router";
import { connect } from "react-redux";

function PrivateRoute(props) {
  const { sessionToken, Component } = props;

  return <div>
    {sessionToken === null ?
      <Redirect to={'/'} noThrow />
      :
      <Component {...props} />
    }
  </div>
}

const mapStateToProps = state => ({
  sessionToken: state.user.sessionToken,
});

export default connect(mapStateToProps)(PrivateRoute);