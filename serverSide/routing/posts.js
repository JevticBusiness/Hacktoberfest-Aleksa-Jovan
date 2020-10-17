const express = require('express');
const router = express.Router();
const multer = require('multer');

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
router.get('/', postController.getPost);


//? POST A POST; /posts - POST
router.post('/', upload.single('memeImage'), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    memeImage: req.file.path
  });
  try {
    const newPost = await post.save()
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//? DELETE SINGLE POST; /posts/:id - DELETE
router.delete('/', postController.deletePost);


//? GET SINGLE POST; /posts/:id - GET
router.get('/', postController.getSinglePost);


//? UPDATING POST; /posts/:id - PATCH
router.patch('/', postController.patchPost);


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