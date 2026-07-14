import AuthRegister from "../models/AuthRegister.js";
export const registerUser = async(req,res) =>{
    try {
       const { name, password, email, adharNumber } = req.body;
       const register = await AuthRegister.create({
            name : name,
            password : password,
            email : email,
            adharNumber : adharNumber
        });
        const io = req.app.get("io");
        io.emit("newUser",{
            name: register.name,
            email : register.email
        }
        )
    res.status(201).json({
      message: "registration successful",
      register
    });
    } catch (error) {
        console.log(error)
    }
}