const player_positionController = require('../controller/player_position');
const player_positionRouter = require('koa-router')({
    prefix: '/player_position'
});

// gets player_positions from Player_Position table
player_positionRouter.get('/', player_positionController.getPlayer_Position);

module.exports = player_positionRouter;