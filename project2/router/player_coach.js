const player_coachController = require('../controller/player_coach');
const player_coachRouter = require('koa-router')({
    prefix: '/player_coach'
});

// gets all player_coaches from Player_Coach table
player_coachRouter.get('/', player_coachController.getPlayer_Coach);

module.exports = player_coachRouter;