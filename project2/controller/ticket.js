const db = require('../database/connection');

class TicketController {
    constructor(){
        console.log('Ticket controller initialized');
    }
    // Gets all tickets from Ticket table
    static getTickets(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = 'SELECT * FROM Ticket;';
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
    // Produces a scalar result of all tickets never sold (regardless of the team).. All teams unsold tickets in NBA
    static allunsoldTickets(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = "SELECT COUNT(*) AS 'Tickets Never Sold' \
                            FROM((\
                                    SELECT id\
                                    FROM Ticket\
                                )\
                            EXCEPT(\
                                    SELECT ticket_id\
                                    FROM Fan\
                            )) AS T;";
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
    //Updates ticket price by increasing price by $1,000
    static updateTicketPriceByTeamIdPlus1000(ctx) {
        return new Promise((resolve, reject) => {
            const ticket = ctx.request.body;
            const query = "UPDATE Ticket\
                            SET price = price + 1000\
                            WHERE team_id = ?";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id]
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
    //Updates ticket price by decreasing price by $1,000
    static updateTicketPriceByTeamIdMinus1000(ctx) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE Ticket\
                            SET price = price - 1000\
                            WHERE team_id = ?";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id]
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

    // Labels tickets by price to determine the benefits the fan will get during the game
    static TicketCalculator(ctx) {
        return new Promise ((resolve, reject) =>{
            const query = "SELECT fn_typeofticket(?);";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.num]
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

module.exports = TicketController;