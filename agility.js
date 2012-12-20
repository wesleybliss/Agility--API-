/**
 * Agility
 * Open source, agile task management, similar to Pivotal Tracker.
 *
 * Support library.
 *
 * @version 1.0
 * @author Wesley Bliss <http://linkedin.com/in/wesleybliss
 */

var Agility = function(){};

Agility.prototype.mysql = require('mysql');
Agility.prototype.link = Agility.prototype.mysql.createConnection({
    host: 'localhost',
    user: 'agility',
    password: 'agility',
    database: 'agility'
});

Agility.prototype.test = function() { return 'heyo' };

//

module.exports.Agility = Agility;

//module.exports = function() {
//    return {
//        foo: 'bar'
//    }
//};