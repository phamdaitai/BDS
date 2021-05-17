import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";

import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import { UserActions } from '../../redux/actions';
import Category from '../common/category';
import AvatarUpload from './avatarUpload';
import { UploadActions } from '../../../upload/redux/actions';

import './styles.scss';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Profile = (props) => {
    const { auth, user } = props;
    const { userDetail = {} } = user;

    const [loaded, setLoaded] = useState(false);

    const [avatar, setAvatar] = useState( userDetail.avatar ? [
        {
          uid: 'xxx',
          status: 'done',
          url: userDetail.avatar,
        }
    ] : []);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getDetailUser(auth.user._id)
        }
    })

    console.log("userDetail", userDetail);

    const updateUser = async (values) => {
        let avatarLink = await uploadImage();
        values.avatar = avatarLink;
        console.log("v", values);
        props.updateUser(auth.user._id, values);
    }

    const uploadImage = async () => {
        let avatarUpload = new FormData();
        let hasUpload = false;

        if (avatar?.length) {
            if (avatar[0].originFileObj) {
                avatarUpload.append("file", avatar[0].originFileObj);

                if (!hasUpload) hasUpload = true;
            }
        }

        if (hasUpload) {
            const data = await UploadActions.uploadSingleImage(avatarUpload);
            if (data && data.length) return data[0];
            return data;
        }

        return undefined;
    }
    
    return <Container>
    {user.isLoading && <Loading />}
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Thông tin cá nhân</Card.Header>
                
            <Card.Body>
                <div className="profile-avatar">
                    <AvatarUpload
                        avatar={avatar}
                        setAvatar={setAvatar}
                    />    
                </div>
                    
                <Form
                    {...layout}
                    name="basic"
                    initialValues={userDetail.name ? userDetail : undefined}
                    onFinish={ updateUser}
                >
                    <Form.Item
                        name="name"
                        label="Tên truy cập"
                        tooltip="Là tên hiển thị của bạn"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên truy cập!',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                        ]}
                    >
                        <Input
                            type="number"
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" loading={user.isLoading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>        
            </Card.Body>
        </ Card>
    </Container.Col>
    <Category />
</Container>
};

const mapStateToProps = state => {
    const { user, auth } = state;
    return {user, auth};
}

const mapDispatchToProps = {
    getDetailUser: UserActions.getDetailUser,
    updateUser: UserActions.updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);