const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Post = require('./models/post')

const app = express();

const dbConn = "mongodb+srv://pwelby:kd9csPskJCZhHREZ@cluster0.wjcpfac.mongodb.net/MEAN-APP2?retryWrites=true&w=majority"

mongoose.connect(dbConn)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.setHeader(
  //   "Access-Control-Request-Headers",
  //   "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  // );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

// Middleware to handle posts
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save()
    .then(createdPost => {
      res.status(201).json({
        message: 'Post added successfully!',
        postId: createdPost._id
      });
    });
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Update successful!'});
    });
});

// Middleware to handle posts hard-coded
app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: documents
      });
    });
});

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found'});
    }

  })
})

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!"});
    })

})

module.exports = app;
