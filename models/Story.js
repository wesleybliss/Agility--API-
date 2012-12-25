
//print_r for debuggering
function print_r(x, max, sep, l) { l = l || 0; max = max || 10; sep = sep || ' '; if (l > max) { return "[WARNING: Too much recursion]\n"; } var i, r = '', t = typeof x, tab = ''; if (x === null) { r += "(null)\n"; } else if (t == 'object') { l++; for (i = 0; i < l; i++) { tab += sep; } if (x && x.length) { t = 'array'; } r += '(' + t + ") :\n"; for (i in x) { try { r += tab + '[' + i + '] : ' + print_r(x[i], max, sep, (l + 1)); } catch(e) { return "[ERROR: " + e + "]\n"; } } } else { if (t == 'string') { if (x == '') { x = '(empty)'; } } r += '(' + t + ') ' + x + "\n"; } return r; }; var_dump = print_r;

/**
 * Story Model
 * 
 * @param       Model      Instance of Model (includes database connection)
 *
 */
module.exports = Model_Story = function( Model ) {
    
    
    /**
     * Private class members
     */
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * Get all stories
         *
         * @param       {Bool}      showProjects        Show projects for each story
         */
        fetchAll: function( callback ) {
            
            // By calling the link.query() method without passing it a callback,
            // we can attach more granular event handling to it using the on() method.
            var link = Model.db.connect(),
                query = link.query('\
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
                    LEFT JOIN `projects`        `p`     ON s.project_id = p.id\
                    LEFT JOIN `story_types`     `st`    ON s.story_type_id = st.id\
                    LEFT JOIN `story_statuses`  `ss`    ON s.story_status_id = ss.id\
                    LEFT JOIN `users`           `r`     ON s.requester_id = r.id\
                    LEFT JOIN `users`           `o`     ON s.owner_id = o.id;\
                '),
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
                    // Add row to results
                    results.push( row );
                })
                .on( 'end', function() {
                    // Send results back to the controller
                    callback( Model.result(results, this.error) );
                });
            
            link.end();
            
        }, // Model_Story.fetchAll()
        
        
        /**
         * Get a specific story by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function( id, callback ) {
            
            var link = Model.db.connect(),
                query = link.query('\
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
                    LEFT JOIN `projects`        `p`     ON s.project_id = p.id\
                    LEFT JOIN `story_types`     `st`    ON s.story_type_id = st.id\
                    LEFT JOIN `story_statuses`  `ss`    ON s.story_status_id = ss.id\
                    LEFT JOIN `users`           `r`     ON s.requester_id = r.id\
                    LEFT JOIN `users`           `o`     ON s.owner_id = o.id\
                    WHERE s.id = ' + id + ';\
                '),
                result = [];
            
            query
                .on( 'error', function(err) {
                    this.error = err;
                })
                .on( 'result', function(row) {
                    console.log(row);
                    result = row;
                })
                .on( 'end', function() {
                    callback( Model.result(result, this.error) );
                });
            
            link.end();
            
        } // Model_Story.findByID()
        
    }
    
    
}; // module.exports Model_Story