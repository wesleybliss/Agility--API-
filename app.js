/**
 * Agility
 * Open source, agile task management, similar to Pivotal Tracker.
 *
 * @version 1.0
 * @author Wesley Bliss <http://linkedin.com/in/wesleybliss
 */


//print_r for debuggering
function print_r(x, max, sep, l) { l = l || 0; max = max || 10; sep = sep || ' '; if (l > max) { return "[WARNING: Too much recursion]\n"; } var i, r = '', t = typeof x, tab = ''; if (x === null) { r += "(null)\n"; } else if (t == 'object') { l++; for (i = 0; i < l; i++) { tab += sep; } if (x && x.length) { t = 'array'; } r += '(' + t + ") :\n"; for (i in x) { try { r += tab + '[' + i + '] : ' + print_r(x[i], max, sep, (l + 1)); } catch(e) { return "[ERROR: " + e + "]\n"; } } } else { if (t == 'string') { if (x == '') { x = '(empty)'; } } r += '(' + t + ') ' + x + "\n"; } return r; }; var_dump = print_r;

/**
 * Enforce graceful shutdown
 *
 * TODO This only catches some terminal exits - need to to SIGTERM/HUP/etc. too
 * 
 */
process.on( 'SIGINT', function() {
    console.log( "\nAbuse detected!\nGracefully shutting down from  SIGINT (Crtl-C)." );
    process.exit();
});


/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./controllers')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
;


// Base Model class
var Model = require('./models')(mysql);

// Models
var models = {
    Model_User: require('./models/User')(Model),
    Model_Project: require('./models/Project')(Model)
};

// Controllers (and pass models so it can access them for better MVC)
var Users = require('./controllers/users')(models.Model_User);
var Projects = require('./controllers/projects')(models.Model_Project);


var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('agility2012'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

//app.configure('development', function(){
//    app.use(express.errorHandler());
//});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', Users.index);
app.get('/users/:id', Users.findByID);
app.get('/projects', Projects.index);
app.get('/projects/:id', Projects.findByID);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Agility via Express server listening on port " + app.get('port'));
});
