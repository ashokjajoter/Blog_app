const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);

        return res.cookie("token",token).redirect("/");
        //console.log("user", user);
        //return res.redirect("/");
    }
    catch (error) {
        return res.render("signin", { 
            error: "Incorrect Email or Password",
        });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    //console.log("Singnup Data",req.body);

    try {
      await User.create({
        fullName,
        email,
        password,
    });

    //console.log("User Created",User);

    return res.redirect("/user/signin");

    } catch (error) {
        
        //console.log("sign up error:", error);

        return res.render("signup", { error: error.message});
    }
});

module.exports = router;