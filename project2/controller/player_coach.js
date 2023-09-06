const db = require('../database/connection');

class Player_Coach_Controller {
    constructor() {
        console.log('Player_Coach controller initialized');
    }
    // gets all player_coaches from Player_Coach table
    static getPlayer_Coach(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Player_Coach;';
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

module.exports = Player_Coach_Controller;