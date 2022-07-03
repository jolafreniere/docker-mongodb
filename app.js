const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

mongoose.connect("mongodb://localhost/example_db")
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongo Connection Error"))
console.log("DONE");