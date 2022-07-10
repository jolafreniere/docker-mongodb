const mongoose = require("mongoose");
console.log(process.cwd());
const {faker} = require('@faker-js/faker')

module.exports = {
    listAll: async function (db, collectionName){
        return await db.collection(collectionName).find();
    },
    initDatabase: function (db){
        console.log("initialized database");
    },
    createFakeData: async function(db){
        console.log("generating fake data...");
        const newUser = new User({
            username: "test",
            firstName: "test",
            lastName: "test",
            passwordHash: "test",
            passwordPlain: "test",
            email: "test",
            phone: "test",
            admin: true
        });
        newUser.save();

        // for(let i = 0; i < 5; i++){
        //     console.log("User %i", i)
        //     let userObject = generateFakeUser();
        //     let user = new userModel(userObject);
        //     console.log(user._id);
        //     await user.save();
        //     console.log("Added user ${user.username}");
        // }
    }

}

function generateFakeUser() {
    return {
      uid: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(),
      city: faker.address.cityName(),
    };
  }
