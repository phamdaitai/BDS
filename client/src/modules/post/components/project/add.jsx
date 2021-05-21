import React, {useState} from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import { Form, Button } from 'antd';

import { PostActions } from '../../redux/actions';

import Detail from '../common/add/detailWithEditor';
import Info from '../common/add/info';
import OtherInfo from '../common/add/otherInfo';
import Map from '../common/add/map';
import AvatarUpload from '../common/add/avatarUpload';
import ImageUpload from '../common/add/imagesUpload';

const PostAddition = (props) => {

    const { post } = props;

    const [location, setLocation] = useState(null);

    const [avatar, setAvatar] = useState([]);

    const [images, setImages] = useState([]);

    const [description, setDescription] = useState("");
    
    const onSubmit = async (values) => {
        let imagesUploaded = await uploadImage();
        if (imagesUploaded?.avatar?.length) {
            values.avatar = imagesUploaded.avatar[0];
        }

        if (imagesUploaded?.images?.length) {
            values.images = imagesUploaded.images;
        }
        
        values.type = 5;
        values.location = location;
        values.description = description;

        console.log("v", values)
        await props.createPost(values);
        
        console.log("post.postDetail._id", post.postDetail);

        if (post.postDetail._id) props.history.push("/");
    };

    const uploadImage = async (values) => {
        let avatarUpload = new FormData();
        let imagesUpload = new FormData();
        let hasUpload = false;

        if (images?.length) {
            images.forEach((e) => {
                if (e.originFileObj) {
                    imagesUpload.append("file", e.originFileObj);
                    imagesUpload.folder = "images";

                    if (!hasUpload) hasUpload = true;
                }
            })
        }

        if (avatar?.length) {
            if (avatar[0].originFileObj) {
                avatarUpload.append("file", avatar[0].originFileObj);
                avatarUpload.folder = "avatar";

                if (!hasUpload) hasUpload = true;
            }
        }

        if (hasUpload) {
            await props.requestUploading()
            const data = await PostActions.uploadAvatarAndImage(avatarUpload, imagesUpload);
            return data;
        }

        return undefined;
    }
    
    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Đăng tin dự án</Card.Header>
                
            <Form
                layout="vertical"
                name="post"
                onFinish={onSubmit}
            >
                <Card.Body>
                    <Detail
                        onChangeDescription={setDescription}
                        description={description}
                    />
                    
                    <Info />

                    <OtherInfo />

                    <Map
                        onChangeLocation={setLocation}
                        location={location}
                    />

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={post.isLoading}>
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Card.Footer>
            </Form>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Thêm ảnh dự án</Card.Header>
            <Card.Body>
                    
                <AvatarUpload
                    avatar={avatar}
                    setAvatar={setAvatar}
                />
                    
                <ImageUpload
                    images={images}
                    setImages={setImages}
                />
                    
            </Card.Body>
        </ Card>
    </Container.Col>
</Container>
};

const mapStateToProps = state => {
    const { post } = state
    return { post };
}

const mapDispatchToProps = {
    createPost: PostActions.createPost,
    requestUploading: PostActions.requestUploading
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAddition));