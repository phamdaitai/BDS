import React, {useState} from "react";
import { connect } from "react-redux";
import { Rate, Button, Input, Avatar } from 'antd';
import { UserOutlined, SendOutlined } from "@ant-design/icons";

import { ratesAverage } from '../../../../../helpers/ratesAverage';
import { PostActions } from '../../../redux/actions';

import CommentItem from './commentItem';

import './styles.scss';

const { TextArea } = Input;

const Interaction = (props) => {
    const { postDetail } = props;
    const { auth } = props;
    const { isAuth, user } = auth;

    const [commentText, setCommentText] = useState("");

    const _interaction = async (data) => {
        let dataFormat = {
            rates: await data.rates,
            follows: data.follows,
            comments: data.comments.map(c => {
                return {
                    user: c.user._id,
                    comment: c.comment,
                    date: c.date
                }
            })
        }

        props.interaction(postDetail._id, dataFormat);
    }

    const hasFollow = () => {
        if (!isAuth) return false;
        return postDetail?.follows?.includes(user._id)
    }

    const followChange = () => {
        if (hasFollow()) {
            let data = {
                rates: postDetail.rates,
                follows: postDetail?.follows?.filter(f => f !== user._id),
                comments: postDetail.comments
            }
            _interaction(data)
        } else {
            let data = {
                rates: postDetail.rates,
                follows: [[...postDetail.follows],[...[user._id]]] ,
                comments: postDetail.comments
            }
            _interaction(data)
        }
    }

    const isDisableRate = () => {
        if (!isAuth) return true;
        for (let i = 0; i < postDetail.rates?.length; ++i) {
            if (postDetail.rates[i].user === user._id) return true;
        }
        return false;
    }

    const changeRate = (value) => {
        let data = {
            rates: [...postDetail.rates, ...[{
                rate: value,
                user: user._id
            }]],
            follows: postDetail.follows,
            comments: postDetail.comments
        }
        _interaction(data)
    }

    const addComment = () => {
        if (!commentText.length) return;
        const newComment = {
            comment: commentText,
            user: { _id: user._id },
            date: new Date()
        };
        
        let data = {
            rates: postDetail.rates,
            follows: postDetail.follows,
            comments: [...[newComment], ...postDetail.comments]
        }
        console.log("data", data);
        _interaction(data)
    }

    const onChangeCommnent = (e) => {
        const { value } = e.target;
        setCommentText(value);
    }

    return <div style={{ marginTop: "1.5rem" }}>
        <hr />
        <h3 style={{ color: "#0f78da" }}>Tương tác bài đăng</h3>
        
        <div className="post-rate-and-follow">
            <Rate className="sale-item-rate" onChange={changeRate} disabled={isDisableRate()} value={ratesAverage(postDetail?.rates)} />
            {isAuth && !hasFollow() && <Button type="dashed" onClick={followChange}>Theo dõi</Button>}
            {isAuth && hasFollow() && <Button type="primary" onClick={followChange}>Đang theo dõi</Button>}
        </div>

        <div className="post-comment">
            {isAuth ?
                (<div className="post-comment-input">
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                        src={user.avatar ? user.avatar : ""}
                        size={40}
                    />
                    <TextArea rows={2} value={commentText} onChange={onChangeCommnent} placeholder="Viết bình luận..." />
                    <div onClick={addComment}>
                        <SendOutlined style={{ fontSize: "2rem", color: "green" }} />
                    </div>
                </div>)
                :
                (<p style={{ color: "red" }}>Đăng nhập để có thể bình luận</p>)}
            
            <div className="post-list-comment">
                {Array.isArray(postDetail.comments) && postDetail.comments.map((c, index) => {
                    return <CommentItem item={c} key={index}/>
                })}
            </div>
        </div>
    </div>
}

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
    interaction: PostActions.interaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Interaction);