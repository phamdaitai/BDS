import React from "react";
import { connect } from "react-redux";
import Container from '../../../../components/container';
import Card from '../../../../components/card';

const DetailPost = (props) => {

    console.log("props.match.params.id", props.match.params.id)
    
    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Chi tiết</Card.Header>
                
            <Card.Body>
            </Card.Body>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Danh mục</Card.Header>
            <Card.Body>
                    
            </Card.Body>
        </ Card>
    </Container.Col>
</Container>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);