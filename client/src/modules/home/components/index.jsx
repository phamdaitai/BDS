import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Pagination, Empty } from 'antd';

import Container from '../../../components/container';
import Card from '../../../components/card';
import Loading from '../../../components/loading';
import SaleItem from '../../../components/saleItem';
import Filter from '../../post/components/common/filter';

import { PostActions } from '../../post/redux/actions';

const Home = (props) => {
    const { post } = props;

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            
            props.getAllPosts(queryData);
        }
    })
    
    useEffect(() => {
        props.getAllPosts(queryData);
    }, [queryData])
    
    return <Container>
        {post.isLoading && <Loading />}
        <Container.Col colSpan={9}>
            <Card >
                <Card.Header>Thông tin nhà đất</Card.Header>
                <Card.Body>
                    {post?.listPosts?.length !== 0 ?
                        post?.listPosts?.map((item) =>
                        <SaleItem
                            postItem={item}
                            key={item._id}
                        />
                        ) :
                        <Empty description="Không có dữ liệu"/>
                    }
                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={post.totalDocs}
                        current={queryData.page}
                        pageSize={queryData.limit}
                        onChange={(page, pageSize) => {
                            setQueryData({ ...queryData, page, limit: pageSize })
                            console.log("page, pageSize", page, pageSize );
                        }}
                        showSizeChanger
                        showQuickJumper
                        pageSizeOptions={[2, 10, 15, 20, 50]}
                        showTotal={total => `Tổng ${total} mục`}
                    />
                </Card.Footer>
            </ Card>
        </Container.Col>
        <Container.Col colSpan={3}>
            <Filter
                queryData={queryData}
                setQueryData={setQueryData}
            />
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
