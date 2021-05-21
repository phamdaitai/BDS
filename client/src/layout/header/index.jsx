import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
import { Layout, Button, Avatar } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";

import Login from '../../modules/auth/components/login';
import Register from '../../modules/user/components/register';
import { AuthActions } from '../../modules/auth/redux/actions';
import { CategoryActions } from '../../modules/category/redux/actions';

import Dropdown from '../../components/dropdown';

const { Header } = Layout;

const Headers = (props) => {
    const { listCategoriesNoPagination = [] } = props.category;

    const { isAuth = false, user } = useSelector(state => state.auth);
    const { isnewRegister = false } = useSelector(state => state.user);
 
    const [state, setState] = useState({
        visibleLogin: false,
        visibleRegister: false,
    });

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllCategoriesNoPagination()
        }
    })

    useEffect(
        () => {
            if (isAuth && state.visibleLogin) {
                setState({visibleLogin: false})
            }
        }, [isAuth, state])
    
    useEffect(
        () => {
            if (isnewRegister && state.visibleRegister) {
                setState({visibleRegister: false})
            }
        }, [isnewRegister])
    
    console.log("listCategoriesNoPagination", listCategoriesNoPagination);
    
    return <Header className="header" style={{ lineHeight: "55px", height: "55px" }}>
        <div className="header-left">
            <Link to="/" >
                <BankOutlined />
                <span>Nhà đất</span>
            </Link>
        </div>
        <div className="header-center">
            <div className="header-center-menu">
                <Dropdown
                    title="Nhà đất bán"
                    items={listCategoriesNoPagination.filter(c => c.type === 1)}
                />

                <Dropdown
                    title="Nhà đất cho thuê"
                    items={listCategoriesNoPagination.filter(c => c.type === 2)}
                />

                <Dropdown
                    title="Dự án"
                    items={listCategoriesNoPagination.filter(c => c.type === 5)}
                />
                
                <Link to="/">
                    <div className="header-center-item">Đăng tin nhà đất</div>
                </Link>
                <Link to="/post-project-add">
                    <div className="header-center-item">Đăng tin dự án</div>
                </Link>
                <Link to="/category">
                    <div className="header-center-item">Danh mục</div>
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
                        src={user.avatar ? user.avatar : ""}
                    />
                    <Link to={`/profile`} style={{ color: "white", marginLeft: '0.25rem', fontWeight: "600", cursor: "pointer" }}>{user.name}</Link>
                    <span style={{color: "#1890ff", cursor: "pointer"}} onClick={() => AuthActions.logOut()}> (đăng xuất)</span>
                </div>
            ) : (
                <React.Fragment>
                    <Button
                        onClick={() => setState({...state, visibleRegister: true})}
                        type="primary"
                        
                    >
                        Đăng ký
                    </Button>
                        
                    <Button
                        onClick={() => setState({...state, visibleLogin: true})}
                        type="primary"
                        style={{
                            marginLeft: '0.5rem',
                            }}
                    >
                        Đăng nhập
                    </Button>
                </React.Fragment>
            )}
            
            <Login visibleLogin={state.visibleLogin} setState={setState} />
            <Register visibleRegister={state.visibleRegister} setState={setState}/>
        </div>
    </Header>;
};

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
