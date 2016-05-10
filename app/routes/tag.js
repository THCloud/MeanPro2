/**
 *  ./app/routes/tag.js
 *
 *  @file     Include the tag RESTFUL.
 *
 *  @author   TH_Cloud
 *
 */

var express = require('express');
var tag = require('../models/tag.js');
var router = express.Router();

router

	// get all tags.
	.get('/', function (req, res, next) {
		tag.getTags((err, data) => {
			if (err) {
				res.json({ errInfo: 'get tags failed' });
			} else {
				res.json(data);
			}
		});
	})

	// add a new tag. need admin session.
	// req.body include json of new tag. (tagName)
	.post('/', function (req, res, next) {
		if (req.session.userRole != 'admin') {
			res.json({ errInfo: 'wrong userRole' });
		} else {
			var newTag = req.body;
			tag.addTag(newTag, (err, data) => {
				if (err) {
					res.json({ errInfo: 'add tag failed' });
				} else {
					res.json({ state: 'success' });
				}
			});
		}
	})

	// update a tag. need admin session.
	// req.body include json of new tag. (tagName)
	.put('/:id', function (req, res, next) {
		if (req.session.userRole != 'admin') {
			res.json({ errInfo: 'wrong userRole' });
		} else {
			var query = {
				_id: req.params.id
			};
			var updates = req.body;
			tag.updateTagById(query, updates, (err, data) => {
				if (err) {
					res.json({ errInfo: 'update task failed' });
				} else {
					res.json({ state: 'success' });
				}
			});
		}
	})

	// delete a tag. need admin session.
	// this will delete all the task of this tag.
	.delete('/:id', function (req, res, next) {
		if (req.session.userRole != 'admin') {
			res.json({ errInfo: 'wrong userRole' });
		} else {
			var query = {
				_id: req.params.id
			};
			tag.deleteTagById(query, (err, data) => {
				if (err) {
					res.json({ errInfo: 'delete tag failed.' });
				} else {
					res.json({ state: 'success' });
				}
			});
		}
	});

module.exports = router;