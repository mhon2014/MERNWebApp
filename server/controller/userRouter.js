const express = require("express");
const userModel = require("../data/userModel");
const bcrypt = require("bcrypt");
const joi = require("joi");

const { signUp, signIn } = require("../validation/user");

const userRouter = express.Router();

// userRouter.use((req,res) => {userInfo.validate(req.body)})

userRouter.get("/getuser", (req, res) => {
  userModel.find().then((data) => {
    // return new Set(data.forEach(e.))
    res.send(data);
  });
});

userRouter.post("/registeruser", async (req, res) => {
    console.log(req.body)
  //parse the input and add encryption to password
  // const user = req.body
  // const newUser = new users(req.body)
  const { result, error } = signUp.validate(req.body);

  if (error) {
    res.status(400).send(error);
  } else {
    const user = new userModel(req.body);

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    user
      .save()
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(500).send(error));
  }
});

userRouter.post("/signin", async (req, res) => {
  const { result, error } = signIn.validate(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        // console.log(req.session)
        req.session.user = user;
        // req.session.save()
        // res.status(200).json({message:'Success'})
        // console.log(req.session);
        res.send(user);
      } else {
        res.status(400).json({ message: "Password invalid" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  }
});

userRouter.get("/signin", async (req, res) => {
  // console.log(req.session)
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false, user: req.session.user });
  }
});

userRouter.get("/signout", async (req, res) => {
  // console.log(req.session)
  req.session.destroy();

  res.status(200).json({ message: "Logged Out" });
});

userRouter.get("/getlist", (req, res) => {
  const email = req.session.user.email;
  userModel
    .findOne({ email: email })
    .then((user) => {
      res.send(user.moviesList);
    })
    .catch((error) => console.log(error));
});

userRouter.put("/addtolist", (req, res) => {
  const email = req.session.user.email;
  console.log(req.body.id);
  userModel
    .findOne({ email: email })
    .then((user) => {
      user.moviesList.push(req.body.id);
      user.save();
      // console.log(user);
      // return new Set(data.forEach(e.))
      // res.send(data);
    })
    // .then(final => console.log(final))
    .catch((error) => console.log(error));
});

userRouter.put("/removelist", (req, res) => {
  const email = req.session.user.email;
  console.log(req.body.id);
  userModel
    .findOne({ email: email })
    .then((user) => {
      user.moviesList.pull(req.body.id);
      user.save();
      console.log(user.moviesList);
      // return new Set(data.forEach(e.))
      res.send(user.moviesList);
    })
    // .then(final => console.log(final))
    .catch((error) => console.log(error));
});

module.exports = userRouter;
