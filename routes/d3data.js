//mongodbDemo
// var mongodb = require('../models/db.js');
var util = require('util');
exports.prac1 = function(req, res){
  //res.render('mongodbDemo1', { title: 'mongodbDemo1' ,layout: 'l2'});
  res.render('d3DataInsert', { title: 'Create log', resp : false,layout: 'l2'});
};

exports.insertdata = function(mongodb){
	  return function(req, res) {
	  	var d3data = {
    		name: req.body.name,
    		count: req.body.count
		};
		var collection = mongodb.get('d3data');
		 collection.insert(d3data,{safe: true}, function(err, d3data){
		 		console.log("d3data data : "+util.inspect(d3data));
		    	// mongodb.close();
		    	res.render('d3DataInsert', { title: 'insert', resp : d3data,layout: 'l2'});
	     });
    };
};

exports.viewDataPie = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('d3data');
        collection.find({}, function (err, docs) {
        	if (err)
        		throw err;
        	res.render('d3DataPie', {
        		title : 'view',
        		dataset : docs,
        		layout : 'l2'
        	});
        });
    };
};


exports.viewDataPie2 = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('d3data');
        collection.find({}, function (err, docs) {
            if (err)
                throw err;
            res.render('d3DataPie2', {
                title : 'view',
                dataset : docs,
                layout : 'l2'
            });
        });
    };
};

/*
exports.viewDataPie2 = function (req, res) {
    res.render('d3DataPie2', { title: 'Create log', resp : false, layout: 'l2' });
};*/


exports.viewDataLine = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('d3data');
        collection.find({}, function (err, docs) {
        	if (err)
        		throw err;
        	res.render('d3DataLine', {
        		title : 'view',
        		dataset : docs,
        		layout : 'l2'
        	});
        });
    };
};

exports.viewDataLine2 = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('d3data');
        collection.find({}, function (err, docs) {
            if (err)
                throw err;
            res.render('d3DataLine2', {
                title : 'view',
                datamongo : docs,
                layout : 'l2'
            });
        });
    };
};