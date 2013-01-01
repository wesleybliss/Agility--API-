/**
 * Projects Controller
 *
 * In the style of Singleton, with a JS closure twist.
 * Models are passed to the closure (at the bottom) for better MVC access.
 */
module.exports = Projects = function( Model_Project ) {
    
    
    /**
     * Private class members
     */
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * GET projects listing.
         */
        index: function( req, res ) {
            
            // Pass the showUsers query string so the model
            // knows if to include users for each project (req.query.*)
            Model_Project.fetchAll( function(result) {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end( JSON.stringify(result) );
            }, req.query.showUsers, req.query.showStories );
            
        }, // Projects.index()
        
        
        /**
         * Get a specific project by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function( req, res ) {
            
            if ( parseInt(req.params.id) < 1 ) {
                res.end( 'Invalid ID: must be numeric, minimum 1.' );
            }
            else {
                Model_Project.findByID( req.params.id, function(result) {
                    res.end( JSON.stringify(result.data) );
                }, req.query.showUsers, req.query.showStories );
            }
            
        } // Projects.findByID()
        
        
    } // public scope
    
}; // End class & closure