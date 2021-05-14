import React, {useState} from "react";
import { connect } from "react-redux";
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

    const [description, setDescription] = useState("");
    
    const onSubmit = async (values) => {
        values.location = location;
        values.description = description;
        console.log("v", values)
        props.createPost(values);
    };
    
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
                <AvatarUpload />
                <ImageUpload />    
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
    createPost: PostActions.createPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddition);