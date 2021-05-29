import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Container from '../../../../components/container';
import Card from '../../../../components/card';

import './styles.scss';

const Category = (props) => {
    
    return <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Danh mục</Card.Header>
            <Card.Body>
                <div className="profile-item-header">
                    <span>Quản lý tài khoản</span>
                </div>

                <div className="profile-item-link">
                    <Link to={`/profile`}>Thông tin cá nhân</Link>
                </div>

                <div className="profile-item-link">
                    <Link to={`/password`}>Đổi mật khẩu</Link>
                </div>
                    
                <div className="profile-item-header">
                    <span>Quản lý bài đăng</span>
                </div>

                <div className="profile-item-link">
                    <Link to={`/user-post`}>Bài đăng</Link>
                </div>

                <div className="profile-item-link">
                    <Link to={`/post-followed`}>Bài đăng đang theo dõi</Link>
                </div>
            </Card.Body>
        </ Card>
    </Container.Col>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);