const  { UserList , MovieList} =  require('./FakeData')
const _ = require('lodash');

/*
query -> users -> fovourite-Movie -> another level
favourite Movie in parent will have whtever parent returns
*/


const resolvers = {
    Query: {
        users:() => {
            if(userList) return { users: UserList}
            return {message: 'Chutiye error ayii hai'}
            // return UserList;
        },
        user:(parent,args , context , info) => {
            const id = args.id ;
            const user = _.find(UserList, {id: Number(id)});
            return user;
        },
        movies: () => {
            return MovieList;
        },
        movie: (parent , args) => {
            const name = args.name;
            const movie = _.find(MovieList, {name})
            return movie;
        }
    },
    User: {
        favoriteMovies: () => {
            return _.filter(MovieList, (movie) => movie.year >= 2010 )
        }
    },

    UserResult: {
        _resolveType(obj){
            if(obj.users){
                return "UserSuccessResult"
            }
            if(obj.message){
                return "UserErrorResult";

            }

            return null;

        }
    },
    Mutation: {
        createUser: (parent , args) => {
            const user = args.input
            const id = UserList[UserList.length-1].id;
            user.id = id + 1;
            UserList.push(user)
            return user;
        }, 

        updateUsername:(parent , args) => {
            const {id , newUsername} = args.input;
            let userUpdate;
            UserList.forEach((user) => {
                if(user.id == id){
                    user.username = newUsername;
                    userUpdate = user;
                }
            });
            return userUpdate;
        },
        deleteUser: (parent ,args) => {
            const {id} = args;
            _.remove(UserList, (user) => user.id == Number(id))
        }
    }
};

module.exports = { resolvers};


// query ExampleQuery {
//     users {
//       ...on UserSuccesfullResult {
//         users {
//           id name
//         }
//       }
//     }
//   }