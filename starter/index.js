const { ApolloServer, gql } = require('apollo-server');
const { printSchema } = require('graphql');
const { type } = require('os');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
# This "Book" type defines the queryable fields for every book in our data source.
type User {
    id: Int
    email: String
    password: String
    firstName: String
    lastName: String
}

type Post {
    id: Int
    authorId: User
    comments: Post
    content: String
    createdAt: String
    updatedAt: String
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
    users: [User]
    posts: [Post]
}

type Mutation {
    addUser(email: String, password: String, firstName:String, lastName:String): User
}

`
;

const users = [
    {
        id:0,
        email: 'loicnguessie@hotmail.com',
        password: 'pass',
        firstName: 'NGUESSIE',
        lastName: 'Loïc',
    },
    {
        id:1,
        email:'user2@hotmail.com',
        password:'pass2',
        firstName:'UserFirstName2',
        lastName:'UserLastName2',
    },
];

const post2 = [
    {
        id: 1,
        authorId: users[1],
        comments: null,
        content:'va y a+',
        createdAt:'2021-10-07',
        updatedAt:'',
    }
];

const posts = [
    {
        id: 0,
        authorId: users[0],
        comments: post2[0],
        content: 'bv',
        createdAt: '2021-10-06',
        updatedAt: post2[0]['createdAt'],
    }
];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        users: () => users,
        posts: () => posts,
    },
    Mutation: {
        addUser: (parent, args) => {
            const user = {
                email: args.email,
                password: args.password,
                firstName: args.firstName,
                lastName: args.lastName,
            }
            users.push(user)
            return "bonjour"
        }
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
