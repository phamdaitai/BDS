import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
import { Layout, Button, Avatar, Drawer } from "antd";
import { StarOutlined, BankOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Headers = () => {
    // const { isAuthenticated = false, user } = useSelector(state => state.auth);
    const isAuthenticated = false;
    const user = {};
    const [state, setState] = useState({
        visibleUser: false,
        visibleModal: false
    });
    
    const showDrawerUser = () => {
        setState({
            ...state,
            visibleUser: true
        });
    };

    const onCloseUser = () => {
        setState({
            ...state,
            visibleUser: false
        });
    };
    

    return <Header className="header" style={{ lineHeight: "55px", height: "55px" }}>
        <div className="header-left">
            <Link to="/" >
                <BankOutlined />
                <span>Nhà đất</span>
            </Link>
        </div>
        <div className="header-center">
            <div className="header-center-menu">
                <Link to="/">
                    <div className="header-center-item">Nhà đất bán</div>
                </Link>
                <Link to="/">
                    <div className="header-center-item">Nhà đất cho thuê</div>
                </Link>
                <Link to="/">
                    <div className="header-center-item">Dự án</div>
                </Link>
                <Link to="/">
                    <div className="header-center-item">Đăng tin nhà đất</div>
                </Link>
                <Link to="/">
                    <div className="header-center-item">Đăng tin dự án</div>
                </Link>
            </div>
         </div>
        <div className="header-right">
            {isAuthenticated ? (
                <div>
                    <Avatar
                        style={{ backgroundColor: "#87d068" }}
                        icon="user"
                        src={user.avatar}
                    />
                    <span style={{ color: "white" }}>{" " + user.name}</span>
                </div>
            ) : (
                <Button
                    onClick={() => {}}
                    type="primary"
                >
                    Đăng nhập
                </Button>
            )}
        </div>
    </Header>;
};

export default connect()(Headers);
