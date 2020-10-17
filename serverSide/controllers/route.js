require('../routing/posts');
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

const deletePost = ('/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'Sucessfully deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getSinglePost = ('/:id', getPost, (req, res) => {
  res.json(res.post);
});

const patchPost = ('/:id', getPost, async (req, res) => {
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

module.exports = {
  postPost: postPost,
  getPost: getPost,
  deletePost: deletePost,
  getSinglePost: getSinglePost,
  patchPost: patchPost
};