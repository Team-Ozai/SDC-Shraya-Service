const Pool = require('pg').Pool
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "Service",
})

const getUpdates = (request, response) => {
  pool.query('SELECT * FROM updates ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUpdateById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM updates WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUpdate = (request, response) => {
  const { title, author, imageUrl, createdAt, body, likes } = request.body

  pool.query('INSERT INTO updates (title, author, imageUrl, createdAt, body, likes) VALUES ($1, $2)', [title, author, imageUrl, createdAt, body, likes], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUpdate = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, author} = request.body

  pool.query(
    'UPDATE updates SET title = $1, author = $2 WHERE id = $3',
    [title, author, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUpdate = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM updates WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
///////////////// COMMENTS ///////////////////

const getComments = (request, response) => {
  pool.query('SELECT * FROM comments ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCommentById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM comments WHERE updateid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createComment = (request, response) => {
  const { username, comment, createdat, updateid } = request.body

  pool.query('INSERT INTO comments (username, comment, createdat, updateid) VALUES ($1, $2, $3, $4)', [ username, comment, createdat, updateid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with updatesID: ${results.updateid}`)
  })
}

const updateComment = (request, response) => {
  const id = parseInt(request.params.id)
  const { comment } = request.body

  pool.query(
    'UPDATE comments SET comment = $1, WHERE id = $2',
    [comment, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteComment = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM comments WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
module.exports = {
  getUpdates,
  getUpdateById,
  createUpdate,
  updateUpdate,
  deleteUpdate,
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
}