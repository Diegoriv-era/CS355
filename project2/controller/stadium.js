const db = require('../database/connection');

class StadiumController {
    constructor(){
        console.log('Stadium controller initialized');
    }
    // gets all stadiums from Stadium table
    static getStadiums(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Stadium;';
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
    // adds stadium to Stadium table
    static addStadium(ctx) {
        return new Promise((resolve, reject) => {
            
            const query = `
                INSERT INTO Stadium
                VALUES (?, ?, ?, ?, ?);`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.name, ctx.params.zip_code, ctx.params.state, ctx.params.city, ctx.params.street_name]
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
    // Deletes Stadium by name
    static deleteStadium(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Stadium
                WHERE name = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.name]
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

module.exports = StadiumController;