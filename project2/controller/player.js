const db = require('../database/connection');

class PlayerController {
    constructor(){
        console.log('Player controller initialized');
    }

    //Gets information from the Player Table
    static getPlayers(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Player;';
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

    // Lists out the most important information about a player by joining 3 tables. 
    static getPlayersInformation(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = "SELECT CONCAT(P.first_name, ' ', P.last_name) AS name, T.name as team , P.stadium_name AS stadium, CONCAT(S.city, \
                            ', ', S.state) AS location, COUNT(A.position) AS '# of positions' \
                            FROM Player AS P JOIN Team AS T ON T.id = P.team_id \
                            JOIN Stadium AS S ON S.name = P.stadium_name \
                            JOIN Player_Position AS A ON A.player_id = P.id \
                            GROUP BY A.player_id;";
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

    /*
    This view is used to look at the top earning player in each team as long as they have a nickname.
    */
    static TopEarningPlayers(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = "SELECT * \
                            FROM TopEarningPlayers;";
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

    // Updates the weight of a player by ID. Can set weight to any realistic number
    static updatePlayerWeight(ctx) {
        return new Promise((resolve, reject) => {
            
            const query = "UPDATE Player\
                            SET weight_lbs = ?\
                            WHERE id = ?";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.weight_lbs, ctx.params.id]
                }, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve();
            });
        });
    }
    





}

module.exports = PlayerController;