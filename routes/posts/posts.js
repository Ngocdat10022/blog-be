import { Router } from "express";
import {
  addPosts,
  deletePosts,
  getDetailPosts,
  getPosts,
  getPostsSimilar,
  updatePosts,
  searchPosts,
} from "../../controller/posts/posts.js";
import { verifyToken } from "../../middleware/auth.js";

const router = Router();

router.get("/search/", searchPosts);
router.get("/", getPosts);
router.get("/:id", getDetailPosts);
router.get("/similar/:id", getPostsSimilar);
router.post("/addposts/", verifyToken, addPosts);
router.delete("/deletePosts/:id", verifyToken, deletePosts);
router.put("/updatePosts/:id", verifyToken, updatePosts);

export default router;
