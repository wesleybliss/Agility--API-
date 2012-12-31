//print_r for debuggering
function print_r(x, max, sep, l) { l = l || 0; max = max || 10; sep = sep || ' '; if (l > max) { return "[WARNING: Too much recursion]\n"; } var i, r = '', t = typeof x, tab = ''; if (x === null) { r += "(null)\n"; } else if (t == 'object') { l++; for (i = 0; i < l; i++) { tab += sep; } if (x && x.length) { t = 'array'; } r += '(' + t + ") :\n"; for (i in x) { try { r += tab + '[' + i + '] : ' + print_r(x[i], max, sep, (l + 1)); } catch(e) { return "[ERROR: " + e + "]\n"; } } } else { if (t == 'string') { if (x == '') { x = '(empty)'; } } r += '(' + t + ') ' + x + "\n"; } return r; }; var_dump = print_r;

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
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                return res.end(JSON.stringify(result));
                // TODO Handle error
                res.render( 'users/index', {
                    title: title + ' | Listing All',
                    users: result.data,
                    error: result.error,
                    /**
                     * TODO There must be another way to
                     * get the query directly from the EJS template
                     */
                    query: req.query
                });
                
            }, req.query.showProjects );
            
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
                        user: result.data,
                        error: result.error,
                        query: req.query
                    });
                }, req.query.showProjects );
            }
            
        } // Users.findByID()
        
        
    } // public scope
    
}; // End class & closure