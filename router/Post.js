const { removeListener } = require("process");
const { verifyTokenAndAdmin } = require("./verifyToken");
const Post = require("../moduls/Post");

const router = require("express").Router();

//create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
// /GET POST
router.get("/find/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
  //GET ALL POST
  router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const post = query
        ? await Post.find().sort({ _id: -1 }).limit(5)
        : await Post.find();
      //   console.log(post);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
