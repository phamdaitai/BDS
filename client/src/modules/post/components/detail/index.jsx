import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import { PostActions } from '../../redux/actions';

const DetailPost = (props) => {
    const { post } = props;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);

            const { id } = props.match.params;
            props.getPostDetail(id);
        }
    })

    console.log("postDetail", post.postDetail);
    
    return <Container>
    {post.isLoading && <Loading />}
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
    const { post } = state;
    return {post};
}

const mapDispatchToProps = {
    getPostDetail: PostActions.getPostDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);