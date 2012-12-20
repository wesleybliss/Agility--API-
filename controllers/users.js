
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
    
    // Page title
    // TODO Why the fuck does this have to be up here & not in the return object? Scope is being a bitch.
    var title = 'Users';
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * GET users listing.
         */
        index: function( req, res ) {
            
            Model_User.fetchAll( function(result) {
                
                // TODO Handle error
                res.render( 'users/index', {
                    title: title + ' | Listing All',
                    users: result.data
                });
                
            });
            
        }, // Users.list()
        
        
        /**
         * Get a specific user by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function(req, res) {
            
            if ( parseInt(req.params.id) < 1 ) {
                res.end( 'Invalid ID: must be numeric, minimum 1.' );
            }
            else {
                Model_User.findByID( req.params.id, function(result) {
                    console.log(result);
                    res.render( 'users/show', {
                        title: title + ' | ' + result.data.email,
                        user: result.data
                    });
                });
            }
            
        } // Users.findByID()
        
        
    } // public scope
    
}; // End class & closure