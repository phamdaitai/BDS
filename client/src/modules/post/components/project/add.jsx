import React from "react";
import { connect } from "react-redux";
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import { Form, Button } from 'antd';

import Detail from '../common/add/detailWithEditor';
import Info from '../common/add/info';
import OtherInfo from '../common/add/otherInfo';
import Map from '../common/add/map';

const PostAddition = (props) => {

    const onSubmit = async (values) => {
        console.log(values)
    };

    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Đăng tin dự án</Card.Header>
                <Card.Body>
                    <Form
                        layout="vertical"
                        name="post"
                        onFinish={onSubmit}
                    >
                        <Detail />
                        
                        <Info />

                        <OtherInfo />

                        <Map />

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Đăng bài
                            </Button>
                        </Form.Item>
                    </Form>
                </Card.Body>
            <Card.Footer>
            
                
           
            </Card.Footer>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Danh mục nhà đất</Card.Header>
            <Card.Body>Nội dung danh mục nhà đất</Card.Body>
            <Card.Footer>footer</Card.Footer>
        </ Card>
    </Container.Col>
</Container>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddition);