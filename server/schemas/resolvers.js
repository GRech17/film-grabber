const { AuthenticationError } = require("apollo-server-errors");
const { User } = require("../models");
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find().select('-__v -password')
      },  

        user: async (parent, {username}) => {
            const params = username ? {username} : {};
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveMovie: async (parent, {movieData}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id:context.user._id},
                    {$push:{savedMovies: movieData}},
                    {new:true}
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in');
        },

        removeMovie: async (parent, {movieId}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id:context.user._id},
                    {$pull:{savedMovies:{movieId}}},
                    {new:true}
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in');
        },
    },
};

module.exports = resolvers;