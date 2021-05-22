import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import { Result } from 'antd';
import "./styles.scss";
import PrivateRoute from "./privateRoute";

const Home = loadable(() => import('../modules/home/components'));
const PostProjectAdd = loadable(() => import('../modules/post/components/project/add'));
const PostSaleAdd = loadable(() => import('../modules/post/components/sale/add'));
const DetailPost = loadable(() => import('../modules/post/components/detail'));
const Profile = loadable(() => import('../modules/user/components/profile'));
const Password = loadable(() => import('../modules/user/components/password'));
const PostOfUser = loadable(() => import('../modules/user/components/postOfUser'));
const EditPost = loadable(() => import('../modules/post/components/edit'));
const Category = loadable(() => import('../modules/category/components'));
const ListPostByCategory = loadable(() => import('../modules/post/components/list'));
const UserListManage = loadable(() => import('../modules/user/components/list-manage'));
const PostListManage = loadable(() => import('../modules/post/components/list-manage'));

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
    component: ({ match }) => <PostProjectAdd match={match} />
  },
  {
    path: "/post-sale-add",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <PostSaleAdd match={match} />
  },
  {
    path: "/detail/:slug.:id.html",
    exact: true,
    component: ({ match }) => <DetailPost match={match} />
  },
  {
    path: "/profile",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <Profile match={match} />
  },
  {
    path: "/password",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <Password match={match} />
  },
  {
    path: "/user-post",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <PostOfUser match={match} />
  },
  {
    path: "/post-edit/:id",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <EditPost match={match} />
  },
  {
    path: "/manage-category",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <Category match={match} />
  },
  {
    path: "/post-cat/:catId",
    exact: true,
    component: ({ match }) => <ListPostByCategory match={match} />
  },
  {
    path: "/manage-user",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <UserListManage match={match} />
  },
  {
    path: "/manage-post",
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <PostListManage match={match} />
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
