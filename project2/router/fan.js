const fanController = require('../controller/fan');
const fanRouter = require('koa-router')({
    prefix: '/fan'
});
// gets all fans from Fan table
fanRouter.get('/', fanController.getFans);
// This procedure is used to neatly organize information for tickets that were bought by fans. Uses fn_typeofticket within the procedure.
fanRouter.get('/getFansTicketType', fanController.getFansTicketType);


module.exports = fanRouter;