const db = require('../database/connection');

class FanController {
    constructor(){
        console.log('Fan controller initialized');
    }
    // gets all fans from Fan table
    static getFans(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Fan;';
            db.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }

    // This procedure is used to neatly organize information for tickets that were bought by fans. Uses fn_typeofticket within the procedure.
    static getFansTicketType(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'CALL sp_fans();';
            db.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }

    


}

module.exports = FanController;