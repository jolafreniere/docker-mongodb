const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//const Database = require("./Utils/Database/Database")
const User = require("./Models/User.js")
const {faker} = require('@faker-js/faker')
const crypto = require('crypto');
const loremIpsum = require('lorem-ipsum');

var db;


async function main(){
    await mongoose.connect("mongodb://admin:password@docker-mongodb-database-1:27017/test2?authSource=admin")
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "Mongo Connection Error"))
    console.log("Purging old data...");
    await User.deleteMany({});
    console.log("Generating fake data...");
    await createFakeUsers(5);
    await User.updateMany({}, {$set: {admin: false}});
    db.save();
}

async function createFakeUsers(amount){
    for(let i = 0; i < amount; i++){
        let id = await createFakeUser();
        console.log("Created User %s", id);
    }
}

async function createFakeUser(){
    let pass = faker.internet.password();
    let hash = hashPassword(pass, "salt");
    const newUser = new User({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        passwordHash: hash,
        passwordPlain: pass,
        email: "test",
        phone: faker.phone.number(),
        admin: true
    });
    await newUser.save();
    return newUser._id;
}

function hashPassword(password, salt){
    return crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
}

main();