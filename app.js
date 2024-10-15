import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session'; // Corrected import statement
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allow credentials (cookies) to be sent
}));

app.use(express.json());

// Use express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Near1234', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Use profile information to check if the user is registered in your db
    // For now, we will just return the profile
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

// Retrieve User from Session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

app.get('/dashboard', (req, res) => {
  res.send(`<h1>Dashboard</h1><p>Welcome, ${req.user.displayName}</p>`);
});

// Import routes
import userRouter from './src/routes/user.routes.js';

// Declare routes
app.use('/api/v1/users', userRouter);

export default app;
