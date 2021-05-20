import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Pagination, Empty } from 'antd';

import Container from '../../../components/container';
import Card from '../../../components/card';
import Loading from '../../../components/loading';

import { CategoryActions } from '../redux/actions';

const Category = (props) => {
    const { category } = props;

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            
            props.getAllCategories(queryData);
        }
    })

    console.log("category", category.listCategories);

    return <Container>
        {category.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>Danh mục bài đăng</Card.Header>
                <Card.Body>
                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={category.totalDocs}
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
    </Container>
};

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategories: CategoryActions.getAllCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
