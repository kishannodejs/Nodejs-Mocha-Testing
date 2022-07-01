const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {Myke} = require('./../../models/myke');
const {User} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneID,
  email: "person1@gmail.com",
  password: "12345678",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoID,
  email: "person2@gmail.com",
  password: "person2PASSWORD",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoID, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text: "First test todo",
  _creator: userOneID
}, {
  _id: new ObjectID(),
  text: "Second test todo",
  _creator: userTwoID
}];

var addDummyTodoItems = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const mykes = [{
  _id: new ObjectID(),
  text: "First test myke",
  _creator: userOneID
}, {
  _id: new ObjectID(),
  text: "Second test Myke",
  _creator: userTwoID
}];

var addDummyMykeItems = (done) => {
  Myke.deleteMany({}).then(() => {
    return Myke.insertMany(mykes);
  }).then(() => done());
};




var addDummyUsers = (done) => {
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {
  todos,
  addDummyTodoItems,
  mykes,
  addDummyMykeItems,
  users,
  addDummyUsers
}
