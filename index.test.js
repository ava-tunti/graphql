// const request = require('supertest');
// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');

// // Sample restaurant data
// let restaurants = [
//   {
//     id: 1,
//     name: "WoodsHill",
//     description: "American cuisine, farm to table, with fresh produce every day",
//     dishes: [
//       { name: "Swordfish grill", price: 27 },
//       { name: "Roasted Broccoli", price: 11 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Fiorellas",
//     description: "Italian-American home cooked food with fresh pasta and sauces",
//     dishes: [
//       { name: "Flatbread", price: 14 },
//       { name: "Carbonara", price: 18 },
//       { name: "Spaghetti", price: 19 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Karma",
//     description: "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
//     dishes: [
//       { name: "Dragon Roll", price: 12 },
//       { name: "Pancake roll", price: 11 },
//       { name: "Cod cakes", price: 13 },
//     ],
//   },
// ];

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
// type Query {
//   restaurant(id: Int): Restaurant
//   restaurants: [Restaurant]
// }
// type Restaurant {
//   id: Int
//   name: String
//   description: String
//   dishes: [Dish]
// }
// type Dish {
//   name: String
//   price: Int
// }
// input RestaurantInput {
//   name: String
//   description: String
// }
// type DeleteResponse {
//   ok: Boolean!
// }
// type Mutation {
//   setrestaurant(input: RestaurantInput): Restaurant
//   deleterestaurant(id: Int!): DeleteResponse
//   editrestaurant(id: Int!, name: String!, description: String!): Restaurant
// }
// `);

// // Resolver functions
// const root = {
//   restaurant: ({ id }) => {
//     return restaurants.find(r => r.id === id);
//   },
//   restaurants: () => {
//     return restaurants;
//   },
//   setrestaurant: ({ input }) => {
//     const newRestaurant = { id: restaurants.length + 1, ...input, dishes: [] };
//     restaurants.push(newRestaurant);
//     return newRestaurant;
//   },
//   deleterestaurant: ({ id }) => {
//     const index = restaurants.findIndex(r => r.id === id);
//     if (index === -1) return { ok: false };
//     restaurants.splice(index, 1);
//     return { ok: true };
//   },
//   editrestaurant: ({ id, name, description }) => {
//     const restaurant = restaurants.find(r => r.id === id);
//     if (!restaurant) return null;
//     restaurant.name = name;
//     restaurant.description = description;
//     return restaurant;
//   },
// };

// const app = express();
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: false,
//   })
// );

// describe('GraphQL API', () => {
//   it('should fetch all restaurants', async () => {
//     const query = `
//       query {
//         restaurants {
//           id
//           name
//           description
//         }
//       }
//     `;
//     const response = await request(app).post('/graphql').send({ query });
//     expect(response.status).toBe(200);
//     expect(response.body.data.restaurants).toBeDefined();
//     // Introduce a failure by expecting an incorrect value
//     expect(response.body.data.restaurants.length).toBe(10); // Assuming you have fewer restaurants
//   });

//   it('should fetch a restaurant by id', async () => {
//     const query = `
//       query {
//         restaurant(id: 1) {
//           name
//           description
//         }
//       }
//     `;
//     const response = await request(app).post('/graphql').send({ query });
//     expect(response.status).toBe(200);
//     expect(response.body.data.restaurant).toBeDefined();
//     // Introduce a failure by expecting an incorrect value
//     expect(response.body.data.restaurant.name).toBe('NonExistentRestaurant'); // This should fail
//   });

//   it('should create a new restaurant', async () => {
//     const mutation = `
//       mutation {
//         setrestaurant(input: { name: "New Restaurant", description: "New description" }) {
//           id
//           name
//           description
//         }
//       }
//     `;
//     const response = await request(app).post('/graphql').send({ query: mutation });
//     expect(response.status).toBe(200);
//     expect(response.body.data.setrestaurant).toBeDefined();
//     // Introduce a failure by expecting an incorrect value
//     expect(response.body.data.setrestaurant.name).toBe('Wrong Name'); // This should fail
//   });

//   it('should delete a restaurant', async () => {
//     const mutation = `
//       mutation {
//         deleterestaurant(id: 1) {
//           ok
//         }
//       }
//     `;
//     const response = await request(app).post('/graphql').send({ query: mutation });
//     expect(response.status).toBe(200);
//     expect(response.body.data.deleterestaurant.ok).toBe(true);
//     // Introduce a failure by checking incorrect data
//     expect(response.body.data.deleterestaurant.ok).toBe(false); // This should fail
//   });

//   it('should edit a restaurant', async () => {
//     const mutation = `
//       mutation {
//         editrestaurant(id: 2, name: "Updated Name", description: "Updated description") {
//           name
//           description
//         }
//       }
//     `;
//     const response = await request(app).post('/graphql').send({ query: mutation });
//     expect(response.status).toBe(200);
//     expect(response.body.data.editrestaurant.name).toBe('Updated Name');
//     // Introduce a failure by checking incorrect data
//     expect(response.body.data.editrestaurant.name).toBe('Another Name'); // This should fail
//   });
// });
//FAILING ONE 


const request = require('supertest');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Sample restaurant data
let restaurants = [
   {
    id: 1,
    name: "WoodsHill",
    description: "American cuisine, farm to table, with fresh produce every day",
    dishes: [
      { name: "Swordfish grill", price: 27 },
      { name: "Roasted Broccoli", price: 11 },
    ],
  },
  {
    id: 2,
    name: "Fiorellas",
    description: "Italian-American home cooked food with fresh pasta and sauces",
    dishes: [
      { name: "Flatbread", price: 14 },
      { name: "Carbonara", price: 18 },
      { name: "Spaghetti", price: 19 },
    ],
  },
  {
    id: 3,
    name: "Karma",
    description: "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
    dishes: [
      { name: "Dragon Roll", price: 12 },
      { name: "Pancake roll", price: 11 },
      { name: "Cod cakes", price: 13 },
    ],
  },
];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type Query {
  restaurant(id: Int): Restaurant
  restaurants: [Restaurant]
}
type Restaurant {
  id: Int
  name: String
  description: String
  dishes: [Dish]
}
type Dish {
  name: String
  price: Int
}
input RestaurantInput {
  name: String
  description: String
}
type DeleteResponse {
  ok: Boolean!
}
type Mutation {
  setrestaurant(input: RestaurantInput): Restaurant
  deleterestaurant(id: Int!): DeleteResponse
  editrestaurant(id: Int!, name: String!, description: String!): Restaurant
}
`);

// Resolver functions
const root = {
  restaurant: ({ id }) => {
    return restaurants.find(r => r.id === id);
  },
  restaurants: () => {
    return restaurants;
  },
  setrestaurant: ({ input }) => {
    const newRestaurant = { id: restaurants.length + 1, ...input, dishes: [] };
    restaurants.push(newRestaurant);
    return newRestaurant;
  },
  deleterestaurant: ({ id }) => {
    const index = restaurants.findIndex(r => r.id === id);
    if (index === -1) return { ok: false };
    restaurants.splice(index, 1);
    return { ok: true };
  },
  editrestaurant: ({ id, name, description }) => {
    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) return null;
    restaurant.name = name;
    restaurant.description = description;
    return restaurant;
  },
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
  })
);

describe('GraphQL API', () => {
  it('should fetch all restaurants', async () => {
    const query = `
      query {
        restaurants {
          id
          name
          description
        }
      }
    `;
    const response = await request(app).post('/graphql').send({ query });
    expect(response.status).toBe(200);
    expect(response.body.data.restaurants).toBeDefined();
  });

  it('should fetch a restaurant by id', async () => {
    const query = `
      query {
        restaurant(id: 1) {
          name
          description
        }
      }
    `;
    const response = await request(app).post('/graphql').send({ query });
    expect(response.status).toBe(200);
    expect(response.body.data.restaurant).toBeDefined();
    expect(response.body.data.restaurant.name).toBe('WoodsHill');
  });

  it('should create a new restaurant', async () => {
    const mutation = `
      mutation {
        setrestaurant(input: { name: "New Restaurant", description: "New description" }) {
          id
          name
          description
        }
      }
    `;
    const response = await request(app).post('/graphql').send({ query: mutation });
    expect(response.status).toBe(200);
    expect(response.body.data.setrestaurant).toBeDefined();
    expect(response.body.data.setrestaurant.name).toBe('New Restaurant');
  });

  it('should delete a restaurant', async () => {
    const mutation = `
      mutation {
        deleterestaurant(id: 1) {
          ok
        }
      }
    `;
    const response = await request(app).post('/graphql').send({ query: mutation });
    expect(response.status).toBe(200);
    expect(response.body.data.deleterestaurant.ok).toBe(true);
  });

  it('should edit a restaurant', async () => {
    const mutation = `
      mutation {
        editrestaurant(id: 2, name: "Updated Name", description: "Updated description") {
          name
          description
        }
      }
    `;
    const response = await request(app).post('/graphql').send({ query: mutation });
    expect(response.status).toBe(200);
    expect(response.body.data.editrestaurant.name).toBe('Updated Name');
  });
});

