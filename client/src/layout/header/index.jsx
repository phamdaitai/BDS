import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
import { Layout, Button, Avatar } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";

import Login from '../../modules/auth/components/login';
import { AuthActions } from '../../modules/auth/redux/actions';

const { Header } = Layout;

const Headers = () => {

    const { isAuth = false, user } = useSelector(state => state.auth);

    const [state, setState] = useState({
        visibleLogin: false
    });

    useEffect(
        () => {
            if (isAuth && state.visibleLogin) {
                setState({visibleLogin: false})
            }
        }, [isAuth])

    
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
            {isAuth ? (
                <div>
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                        src={""}
                    />
                    <span style={{ color: "white", marginLeft: '0.25rem', fontWeight: "600" }}>{user.name}</span>
                    <span style={{color: "#1890ff", cursor: "pointer"}} onClick={() => AuthActions.logOut()}> (đăng xuất)</span>
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
