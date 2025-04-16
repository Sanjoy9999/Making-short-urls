const dotenv = require("dotenv");
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require("express");
const { connectToMongoDB } = require("./db/connect");
const {checkForAuthentication,restrictTo} = require("./middlewares/auth")

const URL = require("./models/url.models");

const urlRoute = require("./routes/url.routes");
const staticRoute = require("./routes/static.routes")
const userRoute = require("./routes/user.routes")

dotenv.config({
  path: "./.env",
});

const app = express();

app.set("view engine","ejs");
app.set('views',path.resolve("./views"))


// Middleware set 1
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)



// Middleware set 2
app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);


app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
 const entry =  await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now()
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

connectToMongoDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error", error);
    });

    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });
