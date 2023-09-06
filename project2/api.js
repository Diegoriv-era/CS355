const koa = require('koa');
const koajson = require('koa-json');
const koabodyparser = require ('koa-bodyparser');
const defaultRouter = require('./router/default.js');

const api = new koa();

const API_PORT = 8066;

const CoachController = new (require('./controller/coach'))();
const FanController = new (require('./controller/fan'))();
const Player_CoachController = new(require('./controller/player_coach'))();
const Player_PositionController = new(require('./controller/player_position'))();
const PlayerController = new(require('./controller/player'))();
const StadiumController = new(require('./controller/stadium'))();
const TeamController = new(require('./controller/team'))();
const TicketController = new(require('./controller/ticket'))();


api.use(koajson());

api.use(koabodyparser());

defaultRouter(api);
api.listen(API_PORT);