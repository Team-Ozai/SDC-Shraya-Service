import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import Updates from './updates.jsx';
import Comments from './comments.jsx';
import PostComment from './postComment.jsx';


class Index extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      id: 2,//This is the default id... but how do we set it to render based on the campaign?
      updates: {},
      comments: {}
    }
    this.send = this.send.bind(this);
  }

  //Updates only show up on a specific campaign so the campaign ID will need to be passed in. Assuming each campaign has only one update, I am using the campaigne/s primary key as the id for update as well.
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: `/api/update/${this.state.id}`
    })
    .then((results) =>{
      this.setState({
        updates: results
      })
      $.ajax({
        type: 'GET',
        url: `/api/comment/${results.id}`
      })
      .then((res) =>{
        this.setState({
          comments: res
        })
      })
    })
  }

  send (thing) {
    $.ajax({
      type: "POST",
      url: "/api/comment",
      data: thing
    });
  };

  render() {
    return (
      <div>
        <Updates update = {this.state.updates}/>
        <div>
          <PostComment onSubmit={this.send} updatesID = {this.state.updates.id}/>
          <Comments comment = {this.state.comments}/>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <Index/>,
  document.getElementById('root')
);

export default Index;