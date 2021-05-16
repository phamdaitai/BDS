import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Container from '../../../../components/container';
import Card from '../../../../components/card';

import './styles.scss';

const Category = (props) => {
    const { user } = props.auth;
    
    return <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Danh mục</Card.Header>
            <Card.Body>
                <div className="profile-item-header">
                    <span>Quản lý tài khoản</span>
                </div>

                <div className="profile-item-link">
                    <Link to={`/profile/${user._id}`}>Thông tin cá nhân</Link>
                </div>

                <div className="profile-item-link">
                    <Link to={`/password/${user._id}`}>Đổi mật khẩu</Link>
                </div>
                    
                <div className="profile-item-header">
                    <span>Quản lý bài đăng</span>
                </div>

                <div className="profile-item-link">
                    <Link to={`/post/${user._id}`}>Bài đăng</Link>
                </div>
            </Card.Body>
        </ Card>
    </Container.Col>
};

const mapStateToProps = state => {
    const { auth } = state;
    return {auth};
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);