const e = require("express");
const  mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    }
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}})
const virtual = employeeSchema.virtual('name')
virtual.get(function() {
    return `${this.lastName} ${this.firstName}`
})

module.exports = mongoose.model("Employee", employeeSchema)