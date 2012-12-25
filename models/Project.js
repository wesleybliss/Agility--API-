
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
     * Get a list of stories for a given project
     *
     * @param       int         projectID   The project's unique ID
     * @param       function    callback    Method will get passed false on error or result on success
     */
    var getStoriesByProjectID = function( projectID, callback ) {
        
        var link = Model.db.connect(),
            query = '\
                SELECT\
                    s.id            AS `id`,\
                    s.title         AS `title`,\
                    s.description   AS `description`,\
                    s.points        AS `points`,\
                    s.created_at    AS `created_at`,\
                    s.modified_at   AS `modified_at`,\
                    p.name          AS `project_name`,\
                    st.label        AS `type`,\
                    ss.label        AS `status`,\
                    r.id            AS `requester_id`,\
                    r.email         AS `requester_email`,\
                    r.first_name    AS `requester_first_name`,\
                    r.last_name     AS `requester_last_name`,\
                    o.id            AS `owner_id`,\
                    o.email         AS `owner_email`,\
                    o.first_name    AS `owner_first_name`,\
                    o.last_name     AS `owner_last_name`\
                FROM stories `s`\
                LEFT JOIN `projects`        `p`     ON s.project_id = ' + projectID + '\
                LEFT JOIN `story_types`     `st`    ON s.story_type_id = st.id\
                LEFT JOIN `story_statuses`  `ss`    ON s.story_status_id = ss.id\
                LEFT JOIN `users`           `r`     ON s.requester_id = r.id\
                LEFT JOIN `users`           `o`     ON s.owner_id = o.id\
                ';
        
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
        
    }; //getStoriesByProjectID()
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * Get all projects
         */
        fetchAll: function( callback, showUsers, showStories ) {
            
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
                    
                    if ( showStories ) {
                        link.pause();
                        getStoriesByProjectID( row.id, function(stories) {
                            if ( (stories !== false) && stories.length ) {
                                results[resultIndex].stories = stories;
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
        findByID: function( id, callback, showUsers, showStories ) {
            
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
                    
                    if ( showStories ) {
                        link.pause();
                        getStoriesByProjectID( row.id, function(stories) {
                            if ( (stories !== false) && stories.length ) {
                                result.stories = stories;
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