const nr = require('newrelic')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db/queries')
const path = require('path')
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/updates', db.getUpdates)
app.get('/updates/:id', db.getUpdateById)
app.post('/updates', db.createUpdate)
app.put('/updates/:id', db.updateUpdate)
app.delete('/updates/:id', db.deleteUpdate)

app.get('/comments', db.getComments)
app.get('/comments/:id', db.getCommentById)
app.post('/comments', db.createComment)
app.put('/comments/:id', db.updateComment)
app.delete('/comments/:id', db.deleteComment)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})