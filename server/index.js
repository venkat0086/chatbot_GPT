require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
// const chatRoutes = require("./routes/chat");
const chatUniRoutes = require("./routes/chat");
const { User } = require("./models/user");

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// database connection
connection();

// Configure passport with Google OAuth credentials
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      //   callbackURL: process.env.REDIRECT_URI,
      // passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in database
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // Create new user record in database
      const user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        picture: profile.photos[0].value,
        passwordRequired: false,
      });
      await user.save();
      done(null, user);
    }
  )
);

// Serialize and deserialize user sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Set up middleware
// app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// middlewares
app.use(express.json());
// app.use(cors());

// routes
app.use("/register", userRoutes);
app.use("/auth", authRoutes);
// app.use("/chat", chatRoutes);
app.use("/chat", chatUniRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
