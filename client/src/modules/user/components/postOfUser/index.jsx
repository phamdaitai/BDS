import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import Category from '../common/category';

const PostOfUser = (props) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
        }
    })
    
    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Quản lý bài đăng</Card.Header>
                
            <Card.Body>
            </Card.Body>
        </ Card>
    </Container.Col>
    <Category />
</Container>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOfUser);