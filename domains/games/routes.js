const express = require('express');

const { listGame, detailGame, createGame, editGame, deleteGame } = require('./controller');

const gameRouter = express.Router();

gameRouter.get('/api/v1/games', listGame);
gameRouter.get('/api/v1/games/:id', detailGame);
gameRouter.post('/api/v1/games', createGame);
gameRouter.put('/api/v1/games/:id', editGame);
gameRouter.delete('/api/v1/games/:id', deleteGame);

module.exports = gameRouter;