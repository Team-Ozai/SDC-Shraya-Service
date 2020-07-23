const fs = require('fs');
const faker = require('faker');

let total = 10000000;
let count = 1;

var createImage = function() {
  var url = 'http://picsum.photos/id/'
  var urlend='/400/400'
  var randomNumber = Math.floor(Math.random() * 1000);
  return url+randomNumber+urlend;
}

const updatesStream = fs.createWriteStream('updates.csv');
updatesStream.write('id,title,author,imageUrl,createdAt,body,likes\n', 'utf8');
function generateUpdates(callback) {
  function writeUpdates() {
    let ok = true;
    while (total > 0 && ok) {
      total --;
      const id = count++;
      const title = faker.lorem.words();
      const author = faker.name.findName();
      const imageUrl = createImage();
      const createdAt = faker.date.past();
      const body = faker.lorem.sentences();
      const likes = faker.random.number();
      const updates = `${id},${title},${author},${imageUrl},${createdAt},${body},${likes}\n`;
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
// const commentsStream = fs.createWriteStream('comments.csv')
// commentsStream.write('id, username,comment,createdAt,userID\n', 'utf8');
// function generateComments(callback) {
//   function writeComments() {
//     let ok = true;
//     while (total > 0 && ok) {
//       total --;
//       const id = count++;
//       const userName = faker.name.findName();
//       const comment = faker.lorem.sentences();
//       const createdAt = faker.date.past();
//       const updateID = Math.ceil(Math.random()*total);
//       const comments = `${id},${userName},${comment},${createdAt},${updateID}\n`;
//       if (total === 0) {
//         commentsStream.write(comments, callback);
//       } else {
//         ok = commentsStream.write(comments);
//       }
//     }
//     if (total > 0) {
//       commentsStream.once('drain', writeComments);
//     }
//   }
//   writeComments();
// }
generateUpdates();
// generateComments();
