const db = require('../database/connection');

class Player_Position_Controller {
    constructor() {
        console.log('Player_Position controller initialized')
    }
    // gets player_positions from Player_Position table
    static getPlayer_Position(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Player_Position;';
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

module.exports = Player_Position_Controller;