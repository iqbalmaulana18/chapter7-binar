const { User, UserBio, Game, UserGameHistory } = require('../../database/models');

module.exports = {
    loginDashboard: function(req, res) {
        res.render('dashboard/login');
    },
    homeDashboard: async function(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return;
        }
    
        const error = req.query.error;
    
        const users = await User.findAll({
            include: {
                model: UserBio,
                as: 'bio',
            },
            order: [
                ['id', 'ASC'],
            ],
        });
    
        const games = await Game.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    
        res.render('dashboard/home', {
            users,
            games,
            error,
        });
    },
    createUser: function(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return;
        }
        res.render('dashboard/users/create');
    },
    updateUser: async function(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return;
        }

        const id = req.params.id;
    
        const currentUser = await User.findOne({
            where: {
                id,
            },
            include: {
                model: UserBio,
                as: 'bio',
            },
        });
    
        if (!currentUser) {
            res.redirect('/dashboard/home');
        }
    
        res.render('dashboard/users/update', {
            user: currentUser,
        });
    },
    deleteUser: async function(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return;
        }

        const id = req.params.id;
    
        const currentUser = await User.findOne({
            where: {
                id,
            },
            include: {
                model: UserBio,
                as: 'bio',
            },
        });
    
        res.render('dashboard/users/delete', {
            user: currentUser 
        });
    },
    userGameHistoryList: async function(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect('/dashboard/login');
            return;
        }

        const id = req.params.id;
    
        const histories = await UserGameHistory.findAll({
            where: {
                user_id: id,
            },
            include: [
                {
                    model: Game,
                    as: 'game',
                },
            ],
            order: [
                [
                    'played_at',
                    'DESC',
                ],
            ]
        });  
    
        res.render('dashboard/users/histories', {
            histories,
        });
    }
};