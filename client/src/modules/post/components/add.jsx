import React from "react";
import { connect } from "react-redux";


const PostAddition = (props) => {
    
    return <div> Đăng bài </div>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddition);