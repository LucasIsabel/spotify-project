import faker from 'faker';

export default {
  data : {
    artists: {
      items: [
        {
          id: faker.random.number({ min:0, max: 1000}),
          name: faker.name.firstName()
        }
      ]
    }
  }
}
