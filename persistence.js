/**
 * Agility
 * Open source, agile task management, similar to Pivotal Tracker.
 *
 * Event listeners for socket.io.
 *
 * @version 1.0
 * @author Wesley Bliss <http://linkedin.com/in/wesleybliss
 */


module.exports = Agility_Persistence = function( io ) {
    
    
    return {
        
        init: function() {
            
            io.sockets.on( 'connection', function(socket) {
                
                socket.emit( 'hello', { message: 'hello world' } );
                
                socket.on( 'sayhi', function(data) {
                    console.log( 'socket: ' + data );
                });
                
            });
            
        }
        
    }
    
};