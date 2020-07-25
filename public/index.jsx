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
      id: 1,
      updates: [],
      comments: []
    }
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: `http://18.219.117.44:3001/updates${window.location.pathname}`
    }).then((results) =>{
      this.setState({
        updates: results
      });
      results.map(id => {
        return(
        $.ajax({
          type: 'GET',
          url: `http://18.219.117.44:3001/comments/${id.id}`
        }).then((res) =>{
          console.log('this is res', res);
          this.setState({
            comments: res
          });
        })
      )})
    });
  }

  send (thing) {
    console.log('thing', thing)
    $.ajax({
      type: "POST",
      url: "/comments",
      data: thing,
    });
    this.componentDidMount()
  }

  render() {
    return (
      <div>
        <Updates update = {this.state.updates}/>
        <div>
          <PostComment onSubmit={this.send} updatesID = {this.state.updates}/>
          <Comments comment = {this.state.comments}/>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <Index/>,
  document.getElementById('update')
);

export default Index;