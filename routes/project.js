
/*
 * GET projects listing.
 */
exports.list = function(req, res) {
    
    var link = require('mysql').createConnection({
        host: 'localhost',
        user: 'agility',
        password: 'agility'
    });
    
    link.connect();
    link.query( 'USE agility' );
    
    link.query( 'SELECT COUNT(id) AS "count" FROM `projects`', function(err, rows, fields) {
        if ( err ) {
            res.end( 'mysql error' + err );
        }
        res.send( 'Found ' + rows[0]['count'] + ' projects.' );
    });
    
    link.end();
    
};