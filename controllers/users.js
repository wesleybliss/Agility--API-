
// MySQL link identifier
// TODO Wonder if there's a better place to put this
//      didn't work in agility.js lib
var mysql = require('mysql');
var link = mysql.createConnection({
    host: 'localhost',
    user: 'agility',
    password: 'agility',
    database: 'agility'
});


/**
 * Users Controller
 *
 * In the style of Singleton, with a JS closure twist.
 * Models are passed to the closure (at the bottom) for better MVC access.
 */
module.exports = Users = function( Model_User ) {
    
    
    /**
     * Private class members
     */
    // ...
    
    
    /**
     * Public class members
     */
    return {
        
        // Page title
        title: 'Users',
        
        /**
         * GET users listing.
         */
        index: function( req, res ) {
            
            var users
            
            res.render( 'users/index', {
                title: this.title + ' | Listing All',
                users: users
            });
            
            //link.connect();
            //
            //var query = 'SELECT id, email, created_at, modified_at AS "count" FROM `users`';
            //
            //link.query( query, function(err, result) {
            //    if ( err ) {
            //        res.end( 'Error: ' + err );
            //    }
            //    else {
            //        res.send( result );
            //    }
            //});
            //
            //link.end();
            
        }, // Users.list()
        
        
        /**
         * Get a specific user by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function(req, res) {
            
            var id = req.params.id;
            
            if ( parseInt(id) < 1 ) {
                
                return res.end( 'Invalid ID: must be numeric, minimum 1.' );
                
            }
            else {
                
                link.connect();
                
                var query = 'SELECT id, email, created_at, modified_at \
                    FROM `users` WHERE id = ' + mysql.escape(id) + ' LIMIT 1';
                
                link.query( query, function(err, result) {
                    if ( err ) {
                        res.end( 'Error: ' + err );
                    }
                    else {
                        res.send( result )
                    }
                });
                
            }
            
            link.end();
            
        } // Users.findByID()
        
        
    } // public scope
    
}; // End class & closure