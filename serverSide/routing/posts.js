const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const PostController = require('../controllers/route');

const corsOptions = {
  origin: 'https://memeit-aj.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//? Multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});  
  
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
  
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter: fileFilter
});

//* Getting all posts
router.get('/', PostController.postsGetAll);

//* Getting single post
router.get('/:id', PostController.getSinglePost);

//* Creating a post
router.post('/', upload.single('memeImage'), PostController.createPost);

//* Updating a post
router.patch('/:id', PostController.updatePost);

//* Delete a post
router.delete('/:id', PostController.deletePost);


module.exports = router;