const fs = require('fs');
const faker = require('faker');

let total = 10000000;

var createImage = function() {
  var url = 'http://picsum.photos/id/'
  var urlend='/400/400'
  var randomNumber = Math.floor(Math.random() * 1000);
  return url+randomNumber+urlend;
}

const updatesStream = fs.createWriteStream('updates.csv');
updatesStream.write('title,author,imageUrl,createdAt,body,likes\n', 'utf8');
function generateUpdates(callback) {
  function writeUpdates() {
    let ok = true;
    while (total > 0 && ok) {
      total --;
      const title = faker.lorem.words();
      const author = faker.name.findName();
      const imageUrl = createImage();
      const createdAt = faker.date.past();
      const body = faker.lorem.sentences();
      const likes = faker.random.number();
      const updates = `${title},${author},${imageUrl},${createdAt},${body},${likes}\n`;
      if (total === 0) {
        updatesStream.write(updates, callback);
      } else {
        ok = updatesStream.write(updates);
      }
    }
    if (total > 0) {
      updatesStream.once('drain', writeUpdates);
    }
  }
  writeUpdates();
}
const commentsStream = fs.createWriteStream('comments.csv')
commentsStream.write('username,comment,createdAt,userID\n', 'utf8');
function generateComments(callback) {
  function writeComments() {
    let ok = true;
    while (total > 0 && ok) {
      total --;
      const userName = faker.name.findName();
      const comment = faker.lorem.sentences();
      const createdAt = faker.date.past();
      const updateID = Math.ceil(Math.random()*total);
      const comments = `${userName},${comment},${createdAt},${updateID}\n`;
      if (total === 0) {
        commentsStream.write(comments, callback);
      } else {
        ok = commentsStream.write(comments);
      }
    }
    if (total > 0) {
      commentsStream.once('drain', writeComments);
    }
  }
  writeComments();
}

generateUpdates();
generateComments();
