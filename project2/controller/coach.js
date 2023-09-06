const db = require('../database/connection');

class CoachController {
    constructor() {
        console.log('Coach controller initialized');
    }
    // gets all coaches from Coach table
    static getCoaches(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Coach;';
            db.query(
                {sql:query}, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }

    // Finds coach by ID
    static getCoachById(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Coach WHERE id = ?;';
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id]
                }, (err, res) => {
                    if(err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Bad Request error!';
                        reject(err);
                    }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }
    // Lists all coaches who coach more than one player
    static getCoaching_num_of_players(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = "SELECT PC.coach_id, CONCAT (C.first_name, ' ', C.last_name) AS name, COUNT(PC.player_id) AS coaching \
                            FROM Player_Coach AS PC \
                            JOIN Coach AS C ON C.id = PC.coach_id \
                            GROUP BY PC.coach_id \
                            HAVING COUNT(PC.player_id) > 1;";
            db.query(
                {sql:query}, (err, res) => {
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

module.exports = CoachController;