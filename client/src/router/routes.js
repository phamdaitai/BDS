import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import "./styles.scss";
import PrivateRoute from "./privateRoute";

export const routes = [
//   {
//     path: "/",
//     exact: true,
//     component: ({ match }) => <HomePage match={match} />
//   },
//   {
//     path: "/mc",
//     exact: true,
//     component: () => <MC />
//   },
  {
    path: "*",
    component: class NotFound extends React.PureComponent {
      static propTypes = {
        staticContext: PropTypes.object
      };

      constructor(props, context) {
        super(props, context);

        if (this.props.staticContext) {
          this.props.staticContext.code = 404;
        }
      }

      render() {
        return (
          <div className="not-found">
            <b style={{ color: "black" }}>Lỗi 404|Trang không tồn tại!</b>
          </div>
        );
      }
    }
  }
];

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Switch>
    {routes.map(
      ({ path, exact = false, isPrivate = false, component }, index) => {
        if (isPrivate) {
          return (
            <PrivateRoute
              key={index}
              exact={exact}
              path={path}
              component={component}
            />
          );
        }
        return (
          <Route key={index} exact={exact} path={path} component={component} />
        );
      }
    )}
  </Switch>
);
