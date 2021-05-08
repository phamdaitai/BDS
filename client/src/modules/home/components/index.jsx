import React from "react";
import { connect } from "react-redux";
import Container from '../../../components/container';
import Card from '../../../components/card';


const Home = (props) => {
    
    return <Container>
        <Container.Col colSpan={9}>
            <Card >
                <Card.Header>Thông tin nhà đất</Card.Header>
                <Card.Body>Nội dung mua bán nhà đất</Card.Body>
                <Card.Footer>Phân trang</Card.Footer>
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
    return state;
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
