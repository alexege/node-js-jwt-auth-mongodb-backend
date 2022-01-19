const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Setup database connection
const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = require("./models/role.model");
const User = require("./models/user.model");
const ROLE = db.role;

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to Mongodb!");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ege's application." });
});

//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Seeding the database with Roles and test users
function initial() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        name: 'User1',
        password: 'Password1',
        email: 'user1@gmail.com'
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added 'User1' to users collection");
      });
      
      new User({
        name: 'User2',
        password: 'Password2',
        email: 'user2@gmail.com'
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added 'User2' to users collection");
      });
      
      new User({
        name: 'User3',
        password: 'Password3',
        email: 'user3@gmail.com'
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added 'User3' to users collection");
      });
    }
  })


  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added 'admin' to roles collection");
      });

    }
  })
}