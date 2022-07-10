const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//const Database = require("./Utils/Database/Database")
const User = require("./Models/User.js")
const Post = require("./Models/Post.js")
const {faker} = require('@faker-js/faker')
const crypto = require('crypto');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const lorem = new LoremIpsum({
    sentncesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

var db;

async function main(){
    await mongoose.connect("mongodb://admin:password@docker-mongodb-database-1:27017/test2?authSource=admin")
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "Mongo Connection Error"))
    console.log("Purging old data...");
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("Generating fake data...");
    await createFakeUsers(5);
    await User.updateMany({}, {$set: {admin: false}});
}

async function createFakeUsers(amount){
    for(let i = 0; i < amount; i++){
        let id = await createFakeUser();
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
    console.log("Created User ...%s", newUser._id.toString().substring(newUser._id.toString().length - 5));
    for(let i = 0; i < Math.floor(Math.random() * (13 - 3 + 1)) + 3; i++){
        let post = await createFakePost(newUser);
        console.log("Created Post %s", post._id);
    }

    return newUser._id;
}

async function createFakePost(user){
    let text = lorem.generateParagraphs(Math.floor(Math.random() * (4 - 0 + 1)) + 0);
    let post = new Post({
        title: lorem.generateSentences(1),
        text: text,
        createdAt: new Date()});
    post.author = user._id;
    await post.save();
    return post;
}

function hashPassword(password, salt){
    return crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
}

main();