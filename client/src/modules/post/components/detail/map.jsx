import React from "react";
import { connect } from "react-redux";
import WrappedMap from './wrappedMap';
import { Form } from 'antd';

import './styles.scss';

const Map = (props) => {
    const {location } = props;

    return <React.Fragment>
        <h3 style={{color: "#0f78da"}}>Vị trí trên bản đồ</h3>
        
        <WrappedMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            location={location}
        />
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);