const ticketController = require('../controller/ticket');
const ticketRouter = require('koa-router')({
    prefix: '/ticket'
});

// Gets all tickets from Ticket table
ticketRouter.get('/', ticketController.getTickets);
// Produces a scalar result of all tickets never sold (regardless of the team).. All teams unsold tickets in NBA
ticketRouter.get('/getUnsoldTickets', ticketController.allunsoldTickets);
//Updates ticket price by increasing price by $1,000
ticketRouter.put('/updateTicketPriceByTeamIdPlus1000/:id', ticketController.updateTicketPriceByTeamIdPlus1000);
//Updates ticket price by decreasing price by $1,000
ticketRouter.put('/updateTicketPriceByTeamIdMinus1000/:id', ticketController.updateTicketPriceByTeamIdMinus1000);
// Labels tickets by price to determine the benefits the fan will get during the game
ticketRouter.get('/TicketCalculator/:num', ticketController.TicketCalculator);

module.exports = ticketRouter;