
const coachRouter =  require('./coach');
const fanRouter = require('./fan');
const playerRouter = require('./player');
const stadiumRouter = require('./stadium');
const teamRouter = require('./team');
const ticketRouter = require('./ticket');
const player_coachRouter = require('./player_coach');
const player_positionRouter = require('./player_position');

const defaultRouter = require('koa-router')({
    prefix: '/api/v1' 
});

defaultRouter.get('/', (ctx) => {
    ctx.body = 'Hello World!'
});



defaultRouter.use(
    coachRouter.routes(),
    fanRouter.routes(),
    player_coachRouter.routes(),
    player_positionRouter.routes(),
    playerRouter.routes(),
    stadiumRouter.routes(),
    teamRouter.routes(),
    ticketRouter.routes()
);
module.exports = api => {
    api.use(defaultRouter.routes());
    api.use(defaultRouter.allowedMethods());
}