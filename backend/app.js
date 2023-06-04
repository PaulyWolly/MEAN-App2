const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'adf1234511',
      title: 'Our first post',
      content: 'This is coming soon!'
    },
    {
      id: '12weqsdeascfgf',
      title: 'Our second post',
      content: 'This is also coming soon!'
    },
    {
      id: '12weqs123gdfshgfhdf67',
      title: 'Our third post',
      content: 'This is about to be coming soon!'
    }
  ]
  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts
  });
});

module.exports = app;
