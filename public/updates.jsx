/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import UpdateTitle from './style/UpdateTitle.style.js';
import UpdateAuthor from './style/UpdateAuthor.style.js';
import UpdateImage from './style/UpdateImage.style.js';
import UpdateBody from './style/UpdateBody.style.js';
import UpdateLikes from './style/UpdateLikes.style.js';


class Updates extends React.Component {
  constructor(props) {
    super (props)
  }
  render(){
    return (
      <div className="update">
        <div>
          {
            this.props.update.map((data) => {
              return (
                <div>
                  <UpdateTitle>{data.title}</UpdateTitle>
                  <UpdateAuthor>
                    {data.author + ' '}
                    {moment(data.createdAt).fromNow()}
                  </UpdateAuthor>
                  <UpdateImage>
                      <img src={data.imageurl}/>
                  </UpdateImage>
                  <UpdateBody>
                      {data.body}
                  </UpdateBody>
                  <UpdateLikes>
                      {data.likes} people like this update
                  </UpdateLikes>
                </div>
              )
            })
          }
        </div>
      </div>
      )
    }
  }

UpdateTitle.displayName = 'UpdateTitle';
UpdateAuthor.displayName = 'UpdateAuthor';
UpdateBody.displayName = 'UpdateBody';
UpdateLikes.displayName = 'UpdateLikes';


export default Updates;