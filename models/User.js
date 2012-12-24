
//print_r for debuggering
function print_r(x, max, sep, l) { l = l || 0; max = max || 10; sep = sep || ' '; if (l > max) { return "[WARNING: Too much recursion]\n"; } var i, r = '', t = typeof x, tab = ''; if (x === null) { r += "(null)\n"; } else if (t == 'object') { l++; for (i = 0; i < l; i++) { tab += sep; } if (x && x.length) { t = 'array'; } r += '(' + t + ") :\n"; for (i in x) { try { r += tab + '[' + i + '] : ' + print_r(x[i], max, sep, (l + 1)); } catch(e) { return "[ERROR: " + e + "]\n"; } } } else { if (t == 'string') { if (x == '') { x = '(empty)'; } } r += '(' + t + ') ' + x + "\n"; } return r; }; var_dump = print_r;

/**
 * User Model
 * 
 * @param       Model      Instance of Model (includes database connection)
 *
 */
module.exports = Model_User = function( Model ) {
    
    
    /**
     * Private class members
     */
    
    /**
     * Get a list of projects a user is a member of
     *
     * @param       int         userID      The user's unique ID
     * @param       function    callback    Method will get passed false on error or result on success
     */
    var getProjectsByUserID = function( userID, callback ) {
        
        var link = Model.db.connect(),
            query = 'SELECT `p`.* FROM `projects` `p`, `users_projects` `up`\
                WHERE `up`.`user_id` = ' + userID + ' AND `up`.`project_id` = `p`.`id`';
        
        link.query( query, function( err, res ) {
            if ( err ) {
                this.error = err;
                callback( false );
            }
            else {
                callback( res );
            }
        });
        
        link.end();
        
    }; // getProjectsByUserID
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * Get all users
         *
         * @param       {Bool}      showProjects        Show projects for each user
         */
        fetchAll: function( callback, showProjects ) {
            
            // By calling the link.query() method without passing it a callback,
            // we can attach more granular event handling to it using the on() method.
            var link = Model.db.connect(),
                query = link.query( 'SELECT id, email, created_at, modified_at FROM `users`;' ),
                results = [];
            
            query
                .on( 'error', function(err) {
                    // Set the error - the .end() call will send it back to the controller
                    // Note: simply passing err was only showing the code, not the message
                    this.error = {
                        code: err.code,
                        message: err.message
                    };
                })
                .on( 'result', function(row) {
                    
                    // Add row to results and get the new corresponding array index
                    var resultIndex = ( results.push(row) - 1 );
                    
                    // Assign at least a default empty array to the object so
                    // the front-end doesn't choke if it goes to look for the list
                    results[resultIndex].projects = [];
                    
                    // showProjects is specified as a querystring parameter
                    if ( showProjects ) {
                        // Pause the parent query or projects will be null!
                        link.pause();
                        // Get all projects associated with this user
                        getProjectsByUserID( row.id, function(projects) {
                            if ( (projects !== false) && projects.length ) {
                                // Assign projects to the user result
                                results[resultIndex].projects = projects;
                            }
                            // Allow the parent query to continue
                            link.resume();
                        });
                    }
                    
                })
                .on( 'end', function() {
                    // Send results back to the controller
                    callback( Model.result(results, this.error) );
                });
            
            link.end();
            
        }, // Model_User.fetchAll()
        
        
        /**
         * Get a specific user by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function( id, callback, showProjects ) {
            
            var link = Model.db.connect(),
                query = link.query( 'SELECT id, email, created_at, modified_at \
                    FROM `users` WHERE id = ' + link.escape(id) + ' LIMIT 1' ),
                result = {};
            
            query
                .on( 'error', function(err) {
                    this.error = err;
                })
                .on( 'result', function(row) {
                    
                    result = row;
                    //result.projects = [];
                    
                    if ( showProjects ) {
                        link.pause();
                        getProjectsByUserID( row.id, function(projects) {
                            if ( (projects !== false) && projects.length ) {
                                result.projects = projects;
                            }
                            link.resume();
                        });
                    }
                    
                })
                .on( 'end', function() {
                    callback( Model.result(result, this.error) );
                });
            
            link.end();
            
        } // Model_User.findByID()
        
    }
    
    
}; // module.exports Model_User