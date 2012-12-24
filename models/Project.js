
//print_r for debuggering
function print_r(x, max, sep, l) { l = l || 0; max = max || 10; sep = sep || ' '; if (l > max) { return "[WARNING: Too much recursion]\n"; } var i, r = '', t = typeof x, tab = ''; if (x === null) { r += "(null)\n"; } else if (t == 'object') { l++; for (i = 0; i < l; i++) { tab += sep; } if (x && x.length) { t = 'array'; } r += '(' + t + ") :\n"; for (i in x) { try { r += tab + '[' + i + '] : ' + print_r(x[i], max, sep, (l + 1)); } catch(e) { return "[ERROR: " + e + "]\n"; } } } else { if (t == 'string') { if (x == '') { x = '(empty)'; } } r += '(' + t + ') ' + x + "\n"; } return r; }; var_dump = print_r;

/**
 * Project Model
 *
 * @param       Model      Instance of Model (includes database connection)
 *
 */
module.exports = Model_Project = function( Model ) {
    
    
    /**
     * Private class members
     */
    
    /**
     * Get a list of members (users) for a given project
     *
     * @param       int         projectID   The project's unique ID
     * @param       function    callback    Method will get passed false on error or result on success
     */
    var getUsersByProjectID = function( projectID, callback ) {
        
        var link = Model.db.connect(),
            userFields = ['id', 'email', 'created_at', 'modified_at'],
            query = 'SELECT `u`.`' + userFields.join('`, `u`.`') + '`\
                FROM `users` `u`, `users_projects` `up`\
                WHERE `up`.`project_id` = ' + projectID + ' AND `up`.`user_id` = `u`.`id`';
        
        link.query( query, function(err, res) {
            if ( err ) {
                this.error = err;
                callback( false );
            }
            else {
                callback( res );
            }
        });
        
        link.end();
        
    }; //getUsersByProjectID()
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * Get all projects
         */
        fetchAll: function( callback, showUsers ) {
            
            var link = Model.db.connect(),
                query = link.query( 'SELECT id, name, private FROM `projects`' ),
                results = [];
            
            query
                .on( 'error', function(err) {
                    this.error = {
                        code: err.code,
                        message: err.message
                    };
                })
                .on( 'result', function(row) {
                    
                    var resultIndex = ( results.push(row) - 1);
                    //results[resultIndex].users = [];
                    
                    if ( showUsers ) {
                        link.pause();
                        getUsersByProjectID( row.id, function(users) {
                            if ( (users !== false) && users.length ) {
                                results[resultIndex].users = users;
                            }
                            link.resume();
                        });
                    }
                    
                })
                .on( 'end', function() {
                    callback( Model.result(results, this.error) );
                });
            
            link.end();
            
        }, // Model_Project.fetchAll()
        
        
        /**
         * Get a specific user by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function( id, callback, showUsers ) {
            
            var link = Model.db.connect(),
                query = link.query( 'SELECT id, name, private \
                    FROM `projects` WHERE id = ' + link.escape(id) + ' LIMIT 1' ),
                result = {};
            
            query
                .on( 'error', function(err) {
                    this.error = {
                        code: err.code,
                        message: err.message
                    };
                })
                .on( 'result', function(row) {
                    
                    result = row;
                    //result.users = [];
                    
                    if ( showUsers ) {
                        link.pause();
                        getUsersByProjectID( row.id, function(users) {
                            if ( (users !== false) && users.length ) {
                                result.users = users;
                            }
                            link.resume();
                        });
                    }
                    
                })
                .on( 'end', function() {
                    callback( Model.result(result, this.error) );
                });
                
            link.end();
            
        } // Model_Project.findByID()
        
    }
    
    
}; // module.exports Model_Project