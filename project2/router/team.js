const teamController = require('../controller/team');
const teamRouter = require('koa-router')({
    prefix: '/team'
});

//gets all teams
teamRouter.get('/', teamController.getTeams);
// Lists all teams that sold out their stadium
teamRouter.get('/getTeams_soldout', teamController.getTeams_soldout);
// Adds new team into the Team table
teamRouter.post('/addTeam/:id/:name/:logo/:color', teamController.addTeam);
// Deletes team by ID
teamRouter.delete('/deleteTeam/:id', teamController.deleteTeam);

module.exports = teamRouter;