const express = require('express');
const { Op } = require('sequelize');
const { Post, Product, Tag } = require('../models');

const router = express.Router();

// 유저 판매글 등록
router.post('/ffeed', async (req, res, next) => {
  try {
    const { productId, specIds, price, desc, tags } = req.body;

    if (!+productId || !+price || typeof desc !== 'string') {
      return res.status(400).json({ message: 'Bad Request!' });
    }
    console.log({ productId, price, desc });
    const post = await Post.create({ productId, price, desc });

    if (!post) {
      return res.status(404).json({ message: 'Post Not Created!' });
    }

    const specs = await post.addPostSpecs(specIds);
    const tagList = await Tag.bulkCreate(
      tags.map((tag) => {
        return { postId: post.postId, name: tag };
      })
    );

    return res.status(200).json({ post, specs, tagList });
  } catch (error) {
    next(error);
  }
});

// 유저 판매글 조회
router.get('/ffeed/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!+postId) {
      return res.status(400).json({ message: 'Bad Request!' });
    }

    const post = await Post.findOne({ postId });

    if (!post) {
      return res.status(404).json({ message: 'Post Not Found!' });
    }

    const tags = await post.getTags();
    const specs = await post.getPostSpecs();

    return res.status(200).json({ post, tags, specs });
  } catch (error) {
    next(error);
  }
});

// shop 상세페이지 조회
router.get('/shop/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!+productId) {
      return res.status(400).json({ message: 'Bad Request!' });
    }

    const product = await Product.findOne({ where: { productId } });

    if (!product) {
      return res.status(404).json({ message: 'Product Not Found!' });
    }

    const posts = await product.getPosts({ order: [['price', 'ASC']] });
    const priceRange = [posts[0].price, posts[posts.length - 1].price];

    return res.status(200).json({ product, priceRange, posts });
  } catch (error) {
    next(error);
  }
});

// 태그로 유저 판매글 조회
router.get('/ffeed', async (req, res, next) => {
  try {
    const { tagName } = req.query;

    const tags = await Tag.findAll({ where: { name: tagName } });

    if (!tags) {
      return res.status(404).json({ message: 'Posts Not Found!' });
    }

    const postIds = tags.map((tag) => tag.postId);
    const posts = await Post.findAll({
      where: { postId: { [Op.in]: postIds } },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
