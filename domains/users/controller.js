const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UserGameHistory, Game, UserBio } = require('../../database/models');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    loginAPI: async function(req, res) {
        const aud = req.header('x-audience');
    
        const username = req.body.username;
        const password = req.body.password;
    
        const user = await User.findOne({
            where: {
                username: username,
            },
        });
    
        if (!user) {
            res.json({
                message: 'failed',
                result: null,
                error: 'invalid user/password',
            });
    
            return;
        }
    
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.json({
                message: 'failed',
                result: null,
                error: 'invalid user/password',
            });
    
            return;
        }
    
        const token = jwt.sign({
            sub: String(user.id),
            iss: 'chapter7',
            aud: aud || 'restful',
        }, JWT_SECRET, {
            expiresIn: '1h',
        });
    
        res.json({
            message: 'success login',
            result: {
                token: token,
            },
            error: null,
        });
    },
    registerAPI: async function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const address = req.body.address;
        const hobby = req.body.hobby;
    
        const created = await User.create({
            username,
            password: bcrypt.hashSync(password),
            role: 'PLAYER',
        });
    
        await UserBio.create({
            user_id: created.id,
            first_name: firstName,
            last_name: lastName,
            address,
            hobby,
        });
    
        res.json({
            message: 'success create new user',
            result: created,
            error: null,
        });
    },
    createUserDashboard: async function (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const address = req.body.address;
        const hobby = req.body.hobby;
      
        const created = await User.create({
          username,
          password: bcrypt.hashSync(password),
          role: "PLAYER",
        });
      
        await UserBio.create({
          user_id: created.id,
          first_name: firstName,
          last_name: lastName,
          address,
          hobby,
        });
      
        res.redirect("/dashboard/home");
      },
      updateUserDashboard: async function (req, res) {
        const id = req.body.user_id;
        const username = req.body.username;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const address = req.body.address;
        const hobby = req.body.hobby;
      
        // await User.update({
        //     username,
        // }, {
        //     where: {
        //         id,
        //     },
        // });
      
        await UserBio.update(
          {
            first_name: firstName,
            last_name: lastName,
            address,
            hobby,
          },
          {
            where: {
              user_id: id,
            },
          }
        );
      
        res.redirect("/dashboard/home");
      },
      deleteUserDashboard: async function (req, res) {
        const id = req.body.user_id;
      
        await UserBio.destroy({
          where: {
            user_id: id,
          },
        });
        await User.destroy({
          where: {
            id,
          },
        });
      
        res.redirect("/dashboard/home");
      }
}