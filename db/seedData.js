const faker = require('faker');
const db = require('./index.js');


const insertSampleUpdates = function() {
  for(var i = 0; i < 1; i++) {
    db.Update.create({
      title: faker.lorem.words(),
      author: faker.name.findName(),
      //Will need to return to this to use API calls to Search Results Amazon S3 - Amazon Web Services
      imageUrl: 'https://updatesforfecprojectonhrr.s3.us-east-2.amazonaws.com/tenor.gif',
      // imageUrl: faker.image.imageUrl(),
      createdAt: faker.date.past(),
      body: faker.lorem.paragraphs(),
      likes: faker.random.number(),
      campaignID: Math.ceil(Math.random()*100)
    })
  }
};


const insertSampleComments = function() {
  for(var i = 0; i < 1; i++) {
    db.Comment.create({
      updateID: Math.ceil(Math.random()*100),
      userName: faker.name.findName(),
      comment:faker.lorem.sentences(),
      createdAt: faker.date.past(),
    })
  }
};



module.exports.insertSampleUpdates = insertSampleUpdates;
module.exports.insertSampleComments = insertSampleComments;