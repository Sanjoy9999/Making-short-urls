const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.models");
const { setUser } = require("../service/auth")

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "Email already registered"
      });
    }

    // Create new user
    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    return res.render("signup", {
      error: "Error creating account. Please try again."
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  const token = setUser(user);
  res.cookie('token', token);

  // Redirect logic based on user type
  if (user.role === "ADMIN") {
    return res.redirect("/admin/urls");
  }

  // Check if user is new (created within last 1 minute)
  const now = new Date();
  const createdAt = new Date(user.createdAt);
  const diffMs = now - createdAt;
  const oneMinuteMs = 60 * 1000;
  if (diffMs < oneMinuteMs) {
    // New user
    return res.redirect("/dashboard"); // or a special welcome page if you have one
  }

  // Old/regular user
  return res.redirect("/dashboard");
}

module.exports = { handleUserSignup, handleUserLogin };
