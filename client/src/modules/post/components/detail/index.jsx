import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import ImagesList from './imagesList';
import Info from './info';
import Map from './map';
import Interaction from './interaction';

import { PostActions } from '../../redux/actions';

import '../../../../common-css/scroll.scss';
import './styles.scss';

const DetailPost = (props) => {
    const { post, postId = "" } = props;
    const { postDetail = {} } = post;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);

            const id = props.match?.params?.id;
                
            props.getPostDetail(id || postId);
        }
    })

    useEffect(() => {
        if (postId) {
            props.getPostDetail(postId);
        }
    }, [postId])
    
    return <Container>
    {post.isLoading && <Loading />}
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>{postDetail?.title}</Card.Header>
                
            <Card.Body>
                {/* Không có bài viết mới hiện thị mô tả ngắn */}
                {!postDetail.description && <div>
                    {postDetail.metaDescription}
                </div>}

                <div
                    dangerouslySetInnerHTML={{ __html: postDetail.description }}
                    className="scroll-thin"
                    style={{overflowY: "auto", maxHeight: "100vh", marginBottom: "1rem"}}
                />
                <hr />
                
                <Info postDetail={postDetail}/>

                {postDetail.images && postDetail.images.length && postDetail.images.length !== 0 &&
                    <React.Fragment>
                        <hr/>
                        <ImagesList images={postDetail.images} />
                    </React.Fragment>
                }
                    
                {postDetail?.location?.lat &&
                    <React.Fragment>
                        <hr/>
                        <Map location={postDetail.location} />
                    </React.Fragment>}
                
                <div style={{ marginTop: "1.5rem" }}>
                    <hr />        
                    <h3 style={{color: "#0f78da"}}>Danh mục</h3>
                    {Array.isArray(postDetail.categories) && postDetail.categories.map(c => (
                        <span className="badge-info">
                            <Link to={`/post-cat/${c._id || ""}`}>{c.name}</Link>
                        </span>
                    ))}    
                </div>
            
                <Interaction
                        postDetail={{ ...postDetail }}
                />
            </Card.Body>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Thông tin liên hệ</Card.Header>
            <Card.Body>
                <div className="post-detail-item-header">
                    <span>Thông tin người đăng</span>
                </div>
                
                <div className="post-detail-user-contact">
                    <div>
                        <UserOutlined /> &ensp;
                        <span>{postDetail?.userName}</span>
                    </div>
                        
                    <div>
                        <PhoneOutlined /> &ensp;
                        <span>{postDetail?.userPhone}</span>    
                    </div>
                </div>
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