import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
import { Layout, Button, Avatar, Modal,  Form, Input } from "antd";
import { BankOutlined } from "@ant-design/icons";

import Login from '../../modules/auth/components/login';

const { Header } = Layout;

const Headers = () => {
    const { isAuthenticated = false, user } = useSelector(state => state.auth);

    const [state, setState] = useState({
        visibleLogin: false
    });
    
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
                    onClick={() => setState({...state, visibleLogin: true})}
                    type="primary"
                >
                    Đăng nhập
                </Button>
            )}
            
            <Login visibleLogin={state.visibleLogin} setState={ setState }/>
        </div>
    </Header>;
};

export default connect()(Headers);
