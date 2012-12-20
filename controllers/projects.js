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
    
    // Page title
    // TODO Why the fuck does this have to be up here & not in the return object? Scope is being a bitch.
    var title = 'Users';
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * GET projects listing.
         */
        index: function( req, res ) {
            
            Model_Project.fetchAll( function(result) {
                
                // TODO Handle error
                res.render( 'projects/index', {
                    title: title + ' | Listing All',
                    projects: result.data
                });
                
            });
            
        }, // Projects.list()
        
        
        /**
         * Get a specific project by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function(req, res) {
            
            if ( parseInt(req.params.id) < 1 ) {
                res.end( 'Invalid ID: must be numeric, minimum 1.' );
            }
            else {
                Model_Project.findByID( req.params.id, function(result) {
                    console.log(result);
                    res.render( 'projects/show', {
                        title: title + ' | ' + result.data.name,
                        project: result.data
                    });
                });
            }
            
        } // Projects.findByID()
        
        
    } // public scope
    
}; // End class & closure