
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
    // ...
    
    
    /**
     * Public class members
     */
    return {
        
        /**
         * Get all uses
         */
        fetchAll: function( callback ) {
            
            Model.db.connect();
            
            var query = 'SELECT id, email, created_at, modified_at FROM `users`';
            var data = [];
            
            Model.db.query( query, function(err, result) {
                callback( Model.result(result, err) );
            });
            
        }
        
    }
    
    
}; // module.exports Model_User