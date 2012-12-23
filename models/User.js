
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
    
    var getProjectsByUserID = function( userID, callback ) {
        
        var link = Model.db.connect(),
            query = 'SELECT `p`.* FROM `projects` `p`, `users_projects` `up`\
                WHERE `up`.`user_id` = ' + userID + ' AND `up`.`project_id` = `p`.`id`';
        
        link.query( query, function( err, result ) {
            if ( err ) {
                this.error = err;
                callback( false );
            }
            else {
                callback( result );
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
            
            var link = Model.db.connect({ multipleStatements: showProjects }),
                query = 'SELECT id, email, created_at, modified_at FROM `users`;';
            
            var results = [],
                queryUsers = link.query( query );
            
            queryUsers
                .on( 'error', function(err) {
                    // Set the error - the .end() call will send it back to the controller
                    this.error = {
                        code: err.code,
                        message: err.message
                    };
                })
                .on( 'result', function(row) {
                    
                    var resultIndex = ( results.push(row) - 1 );
                    results[resultIndex].projects = [];
                    
                    if ( showProjects ) {
                        // Pause the parent query or projects will be null!
                        link.pause();
                        getProjectsByUserID( row.id, function(projects) {
                            console.log( 'found ' + projects.length + ' projects' );
                            if ( (projects !== false) && projects.length ) {
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
        findByID: function( id, callback ) {
            
            var link = Model.db.connect();
            
            var query = 'SELECT id, email, created_at, modified_at \
                FROM `users` WHERE id = ' + link.escape(id) + ' LIMIT 1';
            
            link.query( query, function(err, result) {
                callback( Model.result(result[0], err) );
            });
            
            link.end();
            
        } // Model_User.findByID()
        
    }
    
    
}; // module.exports Model_User