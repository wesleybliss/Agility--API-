

module.exports = Model = function( mysql ) {
    
    return {
        
        /**
         * Create a new MySQL connection instance
         */
        db: mysql.createConnection({
            host: 'localhost',
            user: 'agility',
            password: 'agility',
            database: 'agility'
        }),
        
        
        /**
         * Format a data response
         */
        result: function( data, error ) {
            return {
                data: data,
                error: error
            }
        }
        
    }
    
}; // module.exports Model