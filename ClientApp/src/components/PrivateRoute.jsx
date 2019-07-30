import React from "react";
import { navigate, Redirect } from "@reach/router";
import { connect } from "react-redux";

function PrivateRoute(props) {
  const { sessionToken, Component } = props;

  return <div>
    {sessionToken === undefined && navigate('/') ?
      <Redirect to={'/'} noThrow />
      :
      <Component {...props} />
    }
  </div>
}

const mapStateToProps = state => ({
  sessionToken: state.sessionToken,
});

export default connect(mapStateToProps)(PrivateRoute);