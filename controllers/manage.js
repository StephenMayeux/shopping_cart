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
          price     =  req.body.price && req.body.price.trim(),
          desc      =  req.body.description && req.body.description.trim(),
          cover     = req.body.cover && req.body.cover.trim(),
          error     = false;

      if (title === '' || price === '') {
        error = true;
        req.flash('error', 'Please fill out required fields');
        res.location('/manage/books/add');
        res.redirect('/manage/books/add');
      }

      if (isNaN(price)) {
        error = true;
        req.flash('error', 'Price must be a number');
        res.location('/manage/books/add');
        res.redirect('/manage/books/add');
      }

      if (!error) {
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
      }

    });

    router.get('/books/edit/:id', function(req, res) {
      Category.find({}, function(err, categories) {
        if (err) throw err;
        Book.findOne({_id: req.params.id}, function(err, book) {
          if (err) throw err;
          var model = {
            book: book,
            categories: categories
          };
          res.render('manage/books/edit', model);
        });
      });
    });

    router.post('/books/edit/:id', function(req, res) {
      var title     =  req.body.title && req.body.title.trim(),
          category  =  req.body.category && req.body.category.trim(),
          author    =  req.body.author && req.body.author.trim(),
          publisher =  req.body.publisher && req.body.publisher.trim(),
          price     =  req.body.price && req.body.price.trim(),
          desc      =  req.body.description && req.body.description.trim(),
          cover     = req.body.cover && req.body.cover.trim(),
          error     = false;

      if (title === '' || price === '') {
        error = true;
        req.flash('error', 'Please fill out required fields');
        res.location('/manage/books/edit/' + req.params.id);
        res.redirect('/manage/books/edit/' + req.params.id);
      }

      if (isNaN(price)) {
        error = true;
        req.flash('error', 'Price must be a number');
        res.location('/manage/books/edit/' + req.params.id);
        res.redirect('/manage/books/edit/' + req.params.id);
      }

      if (!error) {
        Book.update({_id: req.params.id}, {
          title: title,
          category: category,
          author: author,
          publisher: publisher,
          price: price,
          description: desc,
          cover: cover
        }, function(err) {
          if (err) throw err;
          req.flash('success', 'Book was updated!');
          res.location('/manage/books');
          res.redirect('/manage/books');
        });
      }
    });

};
