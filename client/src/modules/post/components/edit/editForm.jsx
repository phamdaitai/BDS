import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import { Form, Button } from 'antd';

import { CountryActions } from '../../../country/redux/actions';
import { PostActions } from '../../redux/actions';

import DetailWithEditor from '../common/add/detailWithEditor';
import Detail from '../common/add/detail';
import Info from '../common/add/info';
import OtherInfo from '../common/add/otherInfo';
import Map from '../common/add/map';
import AvatarUpload from '../common/add/avatarUpload';
import ImageUpload from '../common/add/imagesUpload';

const EditForm = (props) => {

    const { post, country } = props;
    const { postForUpdate = {} } = post;
    const { provincesData = [], districtsData = [] } = country;
    
    const [type, setType] = useState(postForUpdate.type);

    const [location, setLocation] = useState(postForUpdate.location);

    const [avatar, setAvatar] = useState(postForUpdate.avatar ? [
        {
          uid: 'xxx',
          status: 'done',
          url: postForUpdate.avatar,
        }
    ] : []);

    const [images, setImages] = useState(
        postForUpdate?.images?.length ?
        postForUpdate.images.map((i) => {
            return {
                uid: i,
                status: 'done',
                url: i,
            }
        }) :
        []
    );

    const [description, setDescription] = useState(postForUpdate.description || "");

    useEffect(() => {
        let provinceInfo = provincesData.find(p => p._id === postForUpdate.province)
        if (provinceInfo) {
            props.getDistricts({ provinceId: provinceInfo.id })
        }
    }, [provincesData]);

    useEffect(() => {
        let districtInfo = districtsData.find(d => d._id === postForUpdate.district)
        if (districtInfo) {
            props.getWards({ districtId: districtInfo.id })
            }
    }, [districtsData])
    
    const onSubmit = async (values) => {
        let imagesUploaded = await uploadImage();
        if (imagesUploaded?.avatar?.length) {
            values.avatar = imagesUploaded.avatar[0];
        } else if (!avatar?.length) {
            //Trong tr?????ng h???p ???nh b??? x??a
            values.avatar = undefined;
        } else {
            values.avatar = avatar[0].url;
        }

        if (imagesUploaded?.images?.length) {
            let imagesAdded = images.filter(i => !i.originFileObj) || [];
            
            values.images = imagesAdded.map(i => i.url).concat(imagesUploaded.images);
        } else {
            let imagesAdded = images.filter(i => !i.originFileObj) || [];

            //Filter ??i c??c h??nh ???nh b??? x??a
            values.images = imagesAdded.map(i => i.url);
        }
            
        values.location = location;
        values.description = description;

        console.log("v", values)
        await props.updatePost( postForUpdate._id, values);

        if (post.postForUpdate._id && !post.isLoading) props.history.push("/user-post");
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
    
    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Ch???nh s???a b??i ????ng</Card.Header>
                
            <Form
                layout="vertical"
                name="post"
                onFinish={onSubmit}
                initialValues={postForUpdate}
            >
                <Card.Body>
                    {type === 5 ?
                    (
                        <DetailWithEditor
                            onChangeDescription={setDescription}
                            description={description}
                        />
                    ) : (
                        <Detail
                            type={type}
                            setType={setType}
                        />         
                    )}
                    
                    <Info />

                    <OtherInfo />

                    <Map
                        onChangeLocation={setLocation}
                        location={location}
                    />

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={post.isLoading}>
                            L??u thay ?????i
                        </Button>
                    </Form.Item>
                </Card.Footer>
            </Form>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Ch???nh s???a ???nh</Card.Header>
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
    const { post, country } = state
    return { post, country };
}

const mapDispatchToProps = {
    updatePost: PostActions.updatePost,
    requestUploading: PostActions.requestUploading,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));