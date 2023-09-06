const stadiumController = require('../controller/stadium');
const stadiumRouter = require('koa-router')({
    prefix: '/stadium'
});

// gets all stadiums from Stadium table
stadiumRouter.get('/', stadiumController.getStadiums);
// adds stadium to Stadium table
stadiumRouter.post('/addStadium/:name/:zip_code/:state/:city/:street_name', stadiumController.addStadium);
// Deletes Stadium by name
stadiumRouter.delete('/deleteStadium/:name', stadiumController.deleteStadium);

module.exports = stadiumRouter;