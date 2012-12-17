/**
 * Agility
 * Open source, agile task management, similar to Pivotal Tracker.
 *
 * @version 1.0
 * @author Wesley Bliss <http://linkedin.com/in/wesleybliss
 */

//var http = require('http');
//http.createServer( function(req, res) {
//    res.writeHead( 200, {'Content-Type': 'text/plain'} );
//    res.end( 'heyo\n' );
//}).listen( 8080, 'agility.local' );
//
//console.log( 'Agility running @ http://agility.local/' );

var express = require('express'),
    app = express();

app.get( '/', function(req, res) {
    res.send([{foo:'bar', bat:'biz'}]);
});

app.listen( 8080, 'agility.local' );
console.log( 'Agility running @ http://agility.local/' );