const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService{

  constructor(){
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for ( let i = 0; i < limit; i ++ ){
      this.users.push({
        id: faker.datatype.number({ min: 1, max: 5000 }),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(25),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        active: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.number({ min: 1, max: 5000 }),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
     return new Promise( (resolve, reject) => {
      setTimeout( () => {
        resolve(this.users);
      }, 1000 );
     } );
  }

  async findOne(id) {
      const index = this.users.findIndex(item => item.id === parseInt(id));
      console.log(index);
      if( index === -1 ){
        throw boom.notFound('User not found');
      }
      const user = this.users[index];
      if( !user['active'] ){
        throw boom.conflict('User Inactive');
      }
      return user;
  }

  async updateProfile(id, changes) {
    const index = this.users.findIndex(item => item.id === parseInt(id));

    if( index === -1 ){
      throw boom.notFound('User not found');
    }else{
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes
      };
      return this.users[index];
    }
  }

  resetPass(id, password) {
    const index = this.users.findIndex(item => item.id === parseInt(id));

    if( index === -1 ){
      throw boom.notFound('User not found');
    }else{
      const user = this.users[index];
      this.users[index] = {
        ...user,
        password: password + faker.internet.password(15)
      };
      return this.users[index];
    }
  }

  toDisabled(id) {
    const index = this.users.findIndex(item => item.id === parseInt(id));

    if( index === -1 ){
      throw boom.notFound('User not found');
    }else{
      const user = this.users[index];
      this.users[index] = {
        ...user,
        active: false
      };
      return { id };
    }
  }

}

module.exports = UsersService;
