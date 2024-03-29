

module.exports = Model = function( mysql ) {
    
    return {
        
        /**
         * Create a new MySQL connection instance
         */
        db: {
            connect: function() {
                return mysql.createConnection({
                    host: 'localhost',
                    user: 'agility',
                    password: 'agility',
                    database: 'agility'
                })
            }
        },
        
        
        /**
         * Format a data response
         */
        result: function( data, error ) {
            return {
                error: error,
                data: data
            }
        }
        
    }
    
}; // module.exports Model