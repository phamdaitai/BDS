import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, isActivedRule, isAdminRule, ...rest }) => {
  const { isAuth, isAdmin, isActived } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        (isAuth && (isActivedRule ? isActived : true) && (isAdminRule ? isAdmin : true)) ?
          <Component {...props} /> :
          <Redirect to="/?requiredLogin=true" />
      }
    />
  );
};

export default withRouter(PrivateRoute);
