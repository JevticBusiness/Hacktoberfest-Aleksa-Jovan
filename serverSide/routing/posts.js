const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors = require('cors')


const corsOptions = {
  origin: 'https://memeit-aj.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const postController = require('../controllers/route')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Post = require('../models/Post');

//? GET ALL POSTS; /posts - GET
//! ne radi router.get('/', postController.getPost);
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//? POST A POST; /posts - POST
router.post('/', cors(), upload.single('memeImage'), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    memeImage: req.file.path
  });
  try {
    const newPost = await post.save()
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: 'Kurac radi' });
  }
});


//? DELETE SINGLE POST; /posts/:id - DELETE
//! ne radi router.delete('/:id', postController.deletePost);
router.delete('/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'Sucessfully deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//? GET SINGLE POST; /posts/:id - GET
//! ne radi router.get('/:id', postController.getSinglePost);
router.get('/:id', getPost, (req, res) => {
  res.json(res.post);
});



//? UPDATING POST; /posts/:id - PATCH
//! ne radi router.patch('/:id', postController.patchPost);
router.patch('/:id', getPost, async (req, res) => {
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
})


//? FINDING POST BY ID FUNCTION 
async function getPost(req, res, next) {
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


module.exports = router;