const {gql} = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String! 
        username: String!
        age: Int!
        nationality: Nationality!
        friends:[User]
        favoriteMovies:[Movie]
    }

    type Movie {
        id:ID!
        name:String!
        year:Int!
        isInTheatre:Boolean!
    }

    type Query {
        users: UserResult
        user(id:ID): User!
        movies: [Movie!]!
        movie(name:String!): Movie!
    }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL
    }

    input UpdateUsernameInput {
        id:ID!
        newUsername: String!
    }


    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUsername(input: UpdateUsernameInput): User
        deleteUser(id: ID!): User
    }

    enum Nationality {
        UNITEDSTATES
        INDIA 
        CANADA 
        BRAZIL 
    }

    type UserSuccessResult {
        users: [User!]!
    }

    type UserErrorResult {
        message: String!
    }

    union UserResult = UserSuccessResult | UserErrorResult 
`;

module.exports={typeDefs}