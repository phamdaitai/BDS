import React from "react";
import { connect } from "react-redux";
import WrappedMap from './wrappedMap';
import { Form } from 'antd';

import './styles.scss';

const Map = (props) => {
    const { onChangeLocation, location } = props;

    return <React.Fragment>
        <div className="post-add-item-header-map post-add-item-header">
            <span>Bản đồ</span>
        </div>
        <p style={{color: "#d33320", marginBottom: "1.5rem"}}>Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn,
            hãy chọn vị trí rao bán của bạn trên bản đồ</p>
        
        <Form.Item
            name="location"
            label="Tọa độ bản đồ"
        >
            <WrappedMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                onChangeLocation={onChangeLocation}
                location={location}
            />
        </Form.Item>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);