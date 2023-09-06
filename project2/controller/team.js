const db = require('../database/connection');

class TeamController {
    constructor(){
        console.log('Team controller initialized');
    }
    //gets all teams
    static getTeams(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Team;';
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
    // Lists all teams that sold out their stadium
    static getTeams_soldout(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = "SELECT *, 'SOLD OUT' AS 'sold out?'\
                            FROM Team AS M\
                            WHERE M.id NOT IN (\
                                                SELECT T.team_id\
                                                FROM Ticket AS T\
                                                WHERE T.id NOT IN (\
                                                                    SELECT ticket_id\
                                                                    FROM Fan\
                                                                ));";
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
    // Adds new team into the Team table
    static addTeam(ctx) {
        return new Promise((resolve, reject) => {
            
            const query = `
                INSERT INTO Team
                VALUES (?, ?, ?, ?);`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id, ctx.params.name, ctx.params.logo, ctx.params.color]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve();
            });
        });
    }
    // Deletes team by ID
    static deleteTeam(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Team
                WHERE ID = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id]
                }, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 204;
                resolve();
            });
        });
    }
    
}

module.exports = TeamController;