import asyncHandler from "express-async-handler";


const loginController = asyncHandler((req, res) => {
    res.send("login");
});
 

const registerController  = asyncHandler((req, res) => {
    res.send("register");
});

export {
    loginController,
    registerController
};