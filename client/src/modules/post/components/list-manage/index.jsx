import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Button, Table, Modal, Select } from 'antd';
import moment from 'moment';

import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';
import DetailPost from '../detail';

import { PostActions } from '../../redux/actions';

import './styles.scss';

const { Option } = Select;

const PostListManage = (props) => {
    const { post } = props;
    const { listPosts = [] } = post;

    const [visibleModal, setVisibleModal] = useState(false);

    const [currentPostId, setCurrentPostId] = useState("");

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
    }, [queryData.page, queryData.limit])

    const columns = [
        {
            key: 'avatar',
            dataIndex: 'avatar',
            title: 'Ảnh',
            width: '5%',
            render: (data, record) => {
                return (
                    <div className="post-list-item-magage-avatar">
                        <img src={record.avatar} alt="" />
                    </div>
                );
            },
        },
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Tiêu đề',
            width: '46%',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (data, record) => {
                return (<a href="##" onClick={() => { setVisibleModal(true); setCurrentPostId(record._id)}}>{data}</a>)
            }
        },
        {
            key: 'userName',
            dataIndex: 'userName',
            title: 'Nguời đăng',
            width: '10%',
        },
        {
            key: 'userPhone',
            dataIndex: 'userPhone',
            title: 'Số điện thoại',
            width: '10%',
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái',
            width: '10%',
            render: (data, record) => {
                return (
                    <Select defaultValue={data} className="select-post-status" onChange={(value) => {props.updatePost(record._id, {...record, status: value})}}>
                        <Option value={1}>
                            <badge className="badge-post-list badge_wait">Đang chờ</badge>
                        </Option>
                        <Option value={2}>
                            <badge className="badge-post-list badge-accept">Đã duyệt</badge>
                        </Option>
                        <Option value={3}>
                            <badge className="badge-post-list badge-cancel">Đã hủy</badge>
                        </Option>
                    </Select>
                )
            }
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày đăng',
            width: 'auto',
            render: (data, record) => {
                return (
                    <span>{moment(new Date(data)).format("hh:mm - DD/MM/YYYY")}</span>
                )
            }
        }
    ];

    return <Container>
        {post.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Modal
                title="Xem trước"
                visible={visibleModal}
                footer={null}
                onCancel={() => setVisibleModal(false)}
                width={"100%"}
            >
                <DetailPost postId={currentPostId}/>
            </Modal>
            
            <Card >
                <Card.Header>
                    Quản lý người dùng
                </Card.Header>
                <Card.Body>
                    {listPosts?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={listPosts}
                            pagination={false}
                        /> :
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
    const { post } = state;
    return { post };
}

const mapDispatchToProps = {
    getAllPosts: PostActions.getAllPosts,
    updatePost: PostActions.updatePost,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListManage);