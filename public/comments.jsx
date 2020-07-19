import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import CommentsDiv from './style/Comments.style.js';
import CommentsAuthor from './style/CommentsAuthor.style.js';
import CommentsBody from './style/CommentsBody.style.js';
import CommentsItem from './style/CommentsItem.style.js';


  function Comments(props){
    const commentsList = props.comment
    console.log('commentsList', commentsList)
    const listItems = commentsList.map((postedComment) =>
      <CommentsItem key = {postedComment.updateid}>
        <CommentsAuthor>
          {postedComment.username}
        </CommentsAuthor>
        {moment(postedComment.createdat).fromNow()}
        <CommentsBody>
          {postedComment.comment}
        </CommentsBody>
      </CommentsItem>
    )
    return (
      <div id="comments">
        <CommentsDiv >
          {listItems}
        </CommentsDiv>
      </div>
    )
  }

export default Comments;
