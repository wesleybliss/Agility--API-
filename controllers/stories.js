/**
 * Stories Controller
 *
 * In the style of Singleton, with a JS closure twist.
 * Models are passed to the closure (at the bottom) for better MVC access.
 */
module.exports = Stories = function( Model_Story ) {
    
    
    /**
     * Private class members
     */
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * GET stories listing.
         */
        index: function( req, res ) {
            
            // Pass the showUsers query string so the model
            // knows if to include users for each story (req.query.*)
            Model_Story.fetchAll( function(result) {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end( JSON.stringify(result) );
            });
            
        }, // Stories.index()
        
        
        /**
         * Get a specific story by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function( req, res ) {
            
            if ( parseInt(req.params.id) < 1 ) {
                res.end( 'Invalid ID: must be numeric, minimum 1.' );
            }
            else {
                Model_Story.findByID( req.params.id, function(result) {
                    res.end( JSON.stringify(result) );
                });
            }
            
        } // Stories.findByID()
        
        
    } // public scope
    
}; // End class & closure