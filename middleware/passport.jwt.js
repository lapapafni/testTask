const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/models')
const config = require("config");
const opts = {}




opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('hash');


module.exports = (passport) => {
     passport.use(new JwtStrategy(opts,async function(payload, done) {

        const user = await User.findOne({where: {id: payload.user_id}, attributes:{exclude: ['password']}})

         if(user){
             done(null, user)
         }else{
             done(null, false)
         }
    }))
}