require('../routing/posts');
const Post = require('../models/Post');
const multer = require('multer');
const { remove } = require('../models/Post');

//* Getting all posts
const postsGetAll = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
}

//*Getting single post
const getSinglePost = async (req, res, next) => {
  let post;

  try { 
    post = await Post.findById(req.params.id); 
    if (!post) {
      return res.status(404).json({ message: 'Sorry, the post you are looking for does not exist' });
    }

    res.post = post;
    res.json(res.post);
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
}

//* Creating a post  
const createPost = async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    memeImage: req.file.path
  });
  
  try {
      const newPost = await post.save();
      res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({ message: 'Something went wrong, please try again' });
  }
} 

//* Updating a post
const updatePost = async (req, res, next) => {
  const {
    title,
    description,
  } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.description = description;
    
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'The post you are looking for does not exist' });
  }
}

//* Deleting a post
const removePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    try {
      await post.remove();
      res.json({ message: 'Sucessfully deleted' });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: 'The post you are looking for does not exist' });
  }
}


//? Controllers export 
module.exports = {
  postsGetAll: postsGetAll,
  getSinglePost: getSinglePost,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: removePost
}