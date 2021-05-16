import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import { Result } from 'antd';
import "./styles.scss";
import PrivateRoute from "./privateRoute";

const Home = loadable(() => import('../modules/home/components'));
const ProjectPostAdd = loadable(() => import('../modules/post/components/project/add'));
const DetailPost = loadable(() => import('../modules/post/components/detail'));
const Profile = loadable(() => import('../modules/user/components/profile'));

//Roles in routes
// 1. guest, 2. user, 3. admin

export const routes = [
  {
    path: "/",
    exact: true,
    component: ({ match }) => <Home match={match} />
  },
  {
    path: "/post-project-add",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <ProjectPostAdd match={match} />
  },
  {
    path: "/detail/:slug.:id.html",
    exact: true,
    component: ({ match }) => <DetailPost match={match} />
  },
  {
    path: "/profile/:id",
    exact: true,
    component: ({ match }) => <Profile match={match} />
  },
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
          <Result
            status="404"
            title="Lỗi 404 | Trang không tồn tại!"
          />
        );
      }
    }
  }
];

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Switch>
    {routes.map(
      ({ path, exact = false, roles = false, component }, index) => {
        if (roles) {
          return (
            <PrivateRoute
              key={index}
              exact={exact}
              path={path}
              roles={roles}
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
