import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import { Form, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//helpers
import { FormatMoney } from '../../../../helpers/formatCurrency';

//actions
import { PostActions } from '../../redux/actions';
import { UserActions } from '../../../user/redux/actions';

//components
import Detail from '../common/add/detailWithEditor';
import Info from '../common/add/info';
import OtherInfo from '../common/add/otherInfo';
import Map from '../common/add/map';
import AvatarUpload from '../common/add/avatarUpload';
import ImageUpload from '../common/add/imagesUpload';
import VIP from '../common/add/vip';

const { confirm } = Modal;

const PostProjectAdd = (props) => {

    const { post, auth, user, fee } = props;
    const { listFees = [] } = fee;
    const { userDetail = {balance: 0} } = user

    const [loaded, setLoaded] = useState(false);

    const [location, setLocation] = useState(null);

    const [avatar, setAvatar] = useState([]);

    const [images, setImages] = useState([]);

    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            props.getDetailUser(auth?.user?._id)
        }
    })
    
    const onSubmit = async (values) => {
        let imagesUploaded = await uploadImage();
        if (imagesUploaded?.avatar?.length) {
            values.avatar = imagesUploaded.avatar[0];
        }

        if (imagesUploaded?.images?.length) {
            values.images = imagesUploaded.images;
        }
        
        values.type = 5;
        values.location = location;
        values.description = description;

        console.log("v", values)
        await props.createPost(values);

        if (post.postDetail?._id) props.history.push("/");
    };

    const uploadImage = async (values) => {
        let avatarUpload = new FormData();
        let imagesUpload = new FormData();
        let hasUpload = false;

        if (images?.length) {
            images.forEach((e) => {
                if (e.originFileObj) {
                    imagesUpload.append("file", e.originFileObj);
                    imagesUpload.folder = "images";

                    if (!hasUpload) hasUpload = true;
                }
            })
        }

        if (avatar?.length) {
            if (avatar[0].originFileObj) {
                avatarUpload.append("file", avatar[0].originFileObj);
                avatarUpload.folder = "avatar";

                if (!hasUpload) hasUpload = true;
            }
        }

        if (hasUpload) {
            await props.requestUploading()
            const data = await PostActions.uploadAvatarAndImage(avatarUpload, imagesUpload);
            return data;
        }

        return undefined;
    }

    const checkPayment = (values) => {
        if (!values.feeId) {
            onSubmit(values)
        } else {
            const vipInfo = listFees.find(f => values.feeId === f._id)
            if (vipInfo) {
                values.vipFee = vipInfo.fee;
                values.vipPoint = vipInfo.point;

                if (vipInfo.fee <= userDetail.balance) {
                    confirmPayment(values)
                } else {
                    confirmRecharge(values)
                }
            }
        }
    }

    const confirmPayment = (values) => {
        confirm({
            title: `Xác nhận thanh toán ${FormatMoney(values.vipFee)} (vnđ) cho bài đăng`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Thanh toán",
            cancelText: "Hủy",
            
            onOk() {
                onSubmit(values)
            },
            onCancel() {},
        });
    }

    const confirmRecharge = (values) => {
        confirm({
            title: `Số dư tài khoản của bạn không đủ, vui lòng nạp thêm tiền vào tài khoản!`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Nạp tiền",
            cancelText: "Hủy",
            
            onOk() {
                props.history.push("/recharge")
            },
            onCancel() {},
        });
    }

    console.log("user", user.userDetail);
    
    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Đăng tin dự án</Card.Header>
                
            <Form
                layout="vertical"
                name="post"
                onFinish={checkPayment}
            >
                <Card.Body>
                    <Detail
                        onChangeDescription={setDescription}
                        description={description}
                    />
                    
                    <Info />

                    <OtherInfo />

                    <Map
                        onChangeLocation={setLocation}
                        location={location}
                    />
                        
                    <VIP />

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={post.isLoading}>
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Card.Footer>
            </Form>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Thêm ảnh dự án</Card.Header>
            <Card.Body>
                    
                <AvatarUpload
                    avatar={avatar}
                    setAvatar={setAvatar}
                />
                    
                <ImageUpload
                    images={images}
                    setImages={setImages}
                />
                    
            </Card.Body>
        </ Card>
    </Container.Col>
</Container>
};

const mapStateToProps = state => {
    const { post, auth, user, fee } = state
    return { post, auth, user, fee };
}

const mapDispatchToProps = {
    createPost: PostActions.createPost,
    requestUploading: PostActions.requestUploading,
    getDetailUser: UserActions.getDetailUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostProjectAdd));