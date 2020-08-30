require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const port = 3000;

const routerUsers = require("./src/routes/user");
const routerProducts = require("./src/routes/product");
const routerProductIn = require("./src/routes/product_in");
const routerProductOut = require("./src/routes/product_out");
const routerAuth = require("./src/routes/auth");
const { User, Product_in, Product, Product_out } = require("./src/models");

// const ProductInController = require("./src/controllers/ProductInController");
// const Webpage = require("./src/helpers/pdf");

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const baseUrl = "/api/v1";

app.use(
  baseUrl + "/user",
  passport.authenticate("jwt", { session: false }),
  routerUsers
);
app.use(baseUrl + "/products", routerProducts);
app.use(baseUrl + "/in", routerProductIn);
app.use(baseUrl + "/out", routerProductOut);
app.use(baseUrl + "/auth", routerAuth);
app.get(baseUrl + "/print/:type/:id", async (req, res) => {
  let type = "";
  if (req.params.type == "in") {
    const result = await Product_in.findByPk(req.params.id, {
      includes: [{ model: Product }],
    });

    type = "in";
    console.log(result);
    res.render("report", { reports: result.dataValues });
  } else if (req.params.type == "out") {
    const result = await Product_out.findByPk(req.params.id, {
      includes: [{ model: Product }],
    });
    type = "out";
    res.render("report", { reports: result.dataValues });
  }
});

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      const validate = user.password === password ? true : false;
      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }
      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  })
);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PRIVATE_KEY,
};

passport.use(
  new JWTstrategy(options, async (token, done) => {
    try {
      return await done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
