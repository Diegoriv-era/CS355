const coachController = require('../controller/coach');
const coachRouter = require('koa-router')({
    prefix: '/coach'
});
// gets all coaches from Coach table
coachRouter.get('/', coachController.getCoaches);
// Finds coach by ID
coachRouter.get('/getCoachById/:id', coachController.getCoachById);
// Lists all coaches who coach more than one player
coachRouter.get('/getCoaching_num_of_players', coachController.getCoaching_num_of_players);

module.exports = coachRouter;