
/*
 * GET mongos users listing.
 */
//var d3 = require('../public/javascripts/d3.v3');
//var mongodb = require('mongodb');
exports.prac1 = function (req, res) {
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Headers", "X-Requested-With");
	var dataset = [10, 15, 20, 25, 30];
	//  res.render('prac1', {  title: 'D3 Demo1', x: 12, y: 34, r: 6 ,layout: 'l2'});
	// div 的套板下，範例會被吃掉，故先關閉 template
	res.render('prac1', {
		title : 'D3 Demo1',
		x : 12,
		y : 34,
		r : 6,
		dataset : dataset,
		layout : 'false'
	});
};

exports.prac2 = function (req, res) {
	var data = [10, 15, 20, 25, 30];
	res.render('prac2', {
		title : 'D3 Demo2',
		layout : 'l2',
		dataset : data
	});
};

exports.prac3 = function (req, res) {
	var data=[
		{"name":"mip","value":24},
		{"name":"theft","value":58},
		{"name":"drugs","value":81},
		{"name":"arson","value":3},
		{"name":"assault","value":80},
		{"name":"burglary","value":49},
	];
	//console.log(JSON.parse());
	res.render('prac3pie', {
		title : 'D3 Demo3',
		dataset : data,
		layout : 'l2'
	});
};

exports.prac4 = function (req, res) {

	var data = [{
			name : "A",
			value : 5
		}, {
			name : "B",
			value : 10
		}, {
			name : "C",
			value : 20
		}, {
			name : "D",
			value : 45
		}, {
			name : "E",
			value : 6
		}, {
			name : "F",
			value : 25
		}
	]

	res.render('prac4', {
		title : 'D3 Demo4',
		dataset : data,
		layout : 'l2'
	});
};

exports.prac5 = function (req, res) {
	/*
	var collection = mongodb.get('d3data');
	collection.find({}, function (err, count) {
	if (err)
	throw err;

	//var data = [5, 10, 20, 45, 6, 25];
	 */
	res.render('prac5', {
		title : 'D3 Demo3',
		dataset : data,
		layout : 'false'
	});
	//}
}
