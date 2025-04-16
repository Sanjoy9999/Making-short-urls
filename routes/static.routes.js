const express = require("express")
const { restrictTo } = require("../middlewares/auth");
const URL = require('../models/url.models'); 
require('../models/user.models'); // Ensure user model is registered for populate

const router = express.Router();

router.get('/admin/urls',restrictTo(['ADMIN']),async(req,res)=>{
    // Fetch all URLs and populate createdBy with user info
    const allurls = await URL.find().populate('createdBy');
    // Group URLs by user
    const urlsByUser = {};
    allurls.forEach(url => {
        const user = url.createdBy;
        if (!user) return; // skip if no user
        const userKey = user._id.toString();
        if (!urlsByUser[userKey]) {
            urlsByUser[userKey] = {
                user,
                urls: []
            };
        }
        urlsByUser[userKey].urls.push(url);
    });
    return res.render('home',{
        adminView: true,
        urlsByUser: Object.values(urlsByUser),
        req // Pass req to EJS
    })
});

// Dashboard for logged-in users
router.get('/dashboard',restrictTo(["NORMAL",'ADMIN']),async(req,res)=>{
    const allurls = await URL.find({ createdBy: req.user._id});
    return res.render('home',{
        urls: allurls,
        adminView: false, // Ensure adminView is always defined
        req // Pass req to EJS
    })
})

// Landing page for root URL
router.get('/',(req,res)=>{
    return res.render("landing");
});

router.get('/signup',(req,res)=>{
    return res.render("signup");
});

router.get('/login',(req,res)=>{
    return res.render("login");
});

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
});

module.exports = router;