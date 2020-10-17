require('../routing/posts');

const express = require('express');
const router = express.Router();
const postController = require('../controllers/route');

const Post = require('../models/Post');
const { get } = require('../routing/posts');

/**
 *  @param {object} req
 *  @param {object} res
*/

const postPost = ('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    img_src: req.body.img_src
  });
  try {
    const newPost = await post.save()
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const getPost = ('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deletePost = ('/:id', findPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'Sucessfully deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getSinglePost = ('/:id', findPost, (req, res) => {
  res.json(res.post);
});

const patchPost = ('/:id', findPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title
    req.body.description = req.body.description
    req.body.img_src
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//? GET ALL POSTS; /posts - GET
router.get('/', postController.getPost);

//? POST A POST; /posts - POST
router.post('/', postController.postPost);

//? DELETE SINGLE POST; /posts/:id - DELETE
router.delete('/', postController.deletePost);


//? GET SINGLE POST; /posts/:id - GET
router.get('/', postController.getSinglePost);


//? UPDATING POST; /posts/:id - PATCH
router.patch('/', postController.patchPost);


//? FINDING POST BY ID FUNCTION 
async function findPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id)
    if (post == null) {
      return res.status(404).json({ message: 'Sorry, this post does not exist!' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.post = post;
  next();
}

module.exports = {
  postPost: postPost,
  getPost: getPost,
  deletePost: deletePost,
  getSinglePost: getSinglePost,
  patchPost: patchPost
};