import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to="/?requiredLogin=true" />
      }
    />
  );
};

export default withRouter(PrivateRoute);
