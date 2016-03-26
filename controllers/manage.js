'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {

    router.get('/books', function (req, res) {
        Book.find({}, function(err, books) {
          if (err) throw err;
          var model = {books: books};
          res.render('manage/books/index', model);
        });
    });

    router.get('/', function(req, res) {
      res.render('manage/index');
    });

    router.get('/categories', function(req, res) {
      Category.find({}, function(err, categories) {
        if (err) throw err;
        var model = {categories: categories};
              res.render('manage/categories/index', model);
      });
    });

    router.get('/books/add', function(req, res) {
      Category.find({}, function(err, categories) {
        if (err) throw err;
        var model = {categories: categories};
        res.render('manage/books/add', model);
      });
    });

    router.post('/books', function(req, res) {
      var title     =  req.body.title && req.body.title.trim(),
          category  =  req.body.category && req.body.category.trim(),
          author    =  req.body.author && req.body.author.trim(),
          publisher =  req.body.publisher && req.body.publisher.trim(),
          price     =  req.body.price && req.body.publisher.trim(),
          desc      =  req.body.description && req.body.description.trim(),
          cover     = req.body.cover && req.body.cover.trim();

      /*if (title === '' || price === '') {
        req.flash('error', 'Please fill out required fields');
        res.location('/manage/books/add');
        res.redirect('/manage/books/add');
      }

      if (isNaN(price)) {
        req.flash('error', 'Price must be a number');
        res.location('/manage/books/add');
        res.redirect('/manage/books/add');
      }*/

      var newBook = new Book({
        title: title,
        category: category,
        description: desc,
        author: author,
        publisher: publisher,
        cover: cover,
        price: price
      });

      newBook.save(function(err) {
        if (err) throw err;
        req.flash('success', 'Book added!');
        res.location('/manage/books');
        res.redirect('/manage/books');
      });

    });

};
