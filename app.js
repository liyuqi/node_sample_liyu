
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var d3demo = require('./routes/d3demo');
var d3data = require('./routes/d3data');
var form = require('./routes/form');
var mongodbDemo = require('./routes/mongodbDemo');
var settings = require('./settings');

var http = require('http');
var path = require('path');
var partials = require('express-partials');
var flash = require('connect-flash');



//純粹當 session store，因為 monk 不知如何設定成express session
var MongoStore = require('connect-mongo')(express);

var monk = require('monk');
var dbevents = monk('127.0.0.1:27017/events');
var sessionStore = new MongoStore({
    db : settings.db
}, function () {
    console.log('connect mongodb success...');
});

var app = express();
// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(flash());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
//app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
		secret : settings.cookie_secret,
		cookie : {
			maxAge : 60000 * 20	//20 minutes
		},
		store : sessionStore
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/formComponent', form.form1);
app.post('/formComponent', function (req, res) { 
    /*
    console.log(req.body.input01            );
    console.log(req.body.optionsCheckbox    );
    console.log(req.body.inlineRadioOptions );
    console.log(req.body.select01           );
    console.log(req.body.multiSelect        );
    console.log(req.body.fileInput          );
    console.log(req.body.textarea           );
    */
    var formitem = [];
    formitem.push(req.body.input01            )
    formitem.push(req.body.inlineCheckbox     )
    formitem.push(req.body.inlineRadioOptions )
    formitem.push(req.body.select01           )
    formitem.push(req.body.multiSelect        )
    formitem.push(req.body.fileInput          )
    formitem.push(req.body.textarea           )
    res.render('formComponent', { title: 'Table', resp : formitem, layout: 'l2' });
});

app.get('/formTable', form.form2);
app.get('/formPaging', form.form3(dbevents));
app.get('/formTest', form.formTest);

app.get('/d3demo1', d3demo.prac1);
app.get('/d3demo2', d3demo.prac2);
app.get('/d3demo3', d3demo.prac3);
app.get('/d3demo4', d3demo.prac4);
app.get('/d3demo5', d3demo.prac5);

app.get('/d3DataInsert', d3data.prac1);
app.post('/d3DataInsert', d3data.insertdata(dbevents));
app.get('/d3DataPie', d3data.viewDataPie(dbevents));
app.get('/d3DataPie2',d3data.viewDataPie2(dbevents));
app.get('/d3DataLine', d3data.viewDataLine(dbevents));
app.get('/d3DataLine2',d3data.viewDataLine2(dbevents));

app.get('/mongoInsert', mongodbDemo.prac1);
app.post('/mongoInsert', mongodbDemo.logCreate(dbevents));
app.get('/mongolog', mongodbDemo.logList(dbevents));
app.post('/mongolog', mongodbDemo.logFind(dbevents));
app.get('/mongo20list', mongodbDemo.logList20(dbevents));
app.post('/mongo20list', mongodbDemo.logNoRegEx(dbevents));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
