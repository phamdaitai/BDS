import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import Container from '../../../components/container';
import Card from '../../../components/card';
import { PostActions } from '../../post/redux/actions';


const Home = (props) => {
    const { post } = props;

    const [queryData, setQueryData] = useState({
        limit: 5,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            
            props.getAllPosts(queryData);
            props.getPostDetail("609f88a5064f143a8839ebd4")
        }
    })

    console.log("post", post);
    
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
    const { post } = state;
    return { post };
}

const mapDispatchToProps = {
    getAllPosts: PostActions.getAllPosts,
    getPostDetail: PostActions.getPostDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
