
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
    // ...
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * Get all projects
         */
        fetchAll: function( callback ) {
            
            var link = Model.db.connect();
            
            var query = 'SELECT id, name, private FROM `projects`';
            var data = [];
            
            link.query( query, function(err, result) {
                console.log( 'project: ' + result[0].name );
                callback( Model.result(result, err) );
            });
            
            link.end();
            
        }, // Model_Project.fetchAll()
        
        
        /**
         * Get a specific user by ID
         *
         * @param       int     id      A numeric ID > 1
         */
        findByID: function( id, callback ) {
            
            var link = Model.db.connect();
            
            var query = 'SELECT id, name, private \
                FROM `projects` WHERE id = ' + link.escape(id) + ' LIMIT 1';
            
            link.query( query, function(err, result) {
                callback( Model.result(result[0], err) );
            });
            
            link.end();
            
        } // Model_Project.findByID()
        
    }
    
    
}; // module.exports Model_Project