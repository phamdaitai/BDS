import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Pagination, Empty } from 'antd';

import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import { UserActions } from '../../redux/actions';

import Category from '../common/category';
import PostItem from './postItem';

import './styles.scss';

const PostOfUser = (props) => {
    const { user, auth } = props;
    const { postsOfUser = [] } = user;

    const [loaded, setLoaded] = useState(false);

    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10
    });

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getPostsOfUser(auth.user._id, queryData)
        }
    })

    useEffect(() => {
        props.getPostsOfUser(auth.user._id, queryData);
    }, [queryData.limit, queryData.page])

    console.log("uSER", queryData.page, queryData.limit);
    
    return <Container>
    {user.isLoading && <Loading />}
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Quản lý bài đăng</Card.Header>
                
            <Card.Body>
                <div style={{padding: "10px"}}>
                    <table className="user-posts-table">
                        <tr>
                            <th>STT</th>
                            <th>Ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Giá</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                            {postsOfUser.length !== 0 ?
                                postsOfUser.map((item, index) =>
                                    <PostItem
                                        postItem={item}
                                        index={index + 1}
                                        key={index}
                                    />) : 
                                <Empty description="Không có dữ liệu" style={{marginTop: "10px"}}/>}
                    </table>
                </div>
            </Card.Body>
                
            <Card.Footer styles={{textAlign: "right"}}>
                <Pagination
                    total={user.totalDocs}
                    current={queryData.page}
                    pageSize={queryData.limit}
                    onChange={(page, pageSize) => {
                        setQueryData({ ...queryData, page, limit: pageSize })
                    }}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={[5, 10, 15, 20, 50]}
                    showTotal={total => `Tổng ${total} mục`}
                />
            </Card.Footer>
        </ Card>
    </Container.Col>
    <Category />
</Container>
};

const mapStateToProps = state => {
    const { user, auth } = state;
    return { user, auth };
}

const mapDispatchToProps = {
    getPostsOfUser: UserActions.getPostsOfUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOfUser);