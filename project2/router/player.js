const playerController = require('../controller/player');
const playerRouter = require('koa-router')({
    prefix: '/player'
});
//Gets information from the Player Table
playerRouter.get('/', playerController.getPlayers);
// Lists out the most important information about a player by joining 3 tables.
playerRouter.get('/getPlayersInformation', playerController.getPlayersInformation);
//This view is used to look at the top earning player in each team as long as they have a nickname
playerRouter.get('/TopEarningPlayers', playerController.TopEarningPlayers);
// Updates the weight of a player by ID. Can set weight to any realistic number
playerRouter.put('/updatePlayerWeight/:weight_lbs/:id', playerController.updatePlayerWeight);

module.exports = playerRouter;