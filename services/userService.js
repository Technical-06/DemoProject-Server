require('../db/conn');
const User = require('../model/userSchema');
bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const register= async(name,email,phone,password)=>{
    try {
        const Exists = await User.findOne({email:email});
        if(Exists){
            return "Exists"
        }else{
            const user = new User({name,email,phone,password});
            const result = await user.save();
            if (result){
                return "Success"
            }
        }

    } catch (error) {
        return error
    }
}

const login = async(email,password)=>{
    try {
        let token;
        const userLogin = await User.findOne({email:email});
        if(userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password);
            if(isMatch){
                const token = await userLogin.generateAuthToken();
                return {_id:userLogin._id, name:userLogin.name, email:userLogin.email, phone:userLogin.phone, contactedProperty: userLogin.contactedProperty};

            }else{
                return "Wrong Credentials"
            }


        }else{
            return "Wrong Credentials";
        }
    } catch (error) {
        return error
    }
}

const getUser = async(token)=>{
    try {
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        if(verifyUser){
            const user  =await User.findOne({_id:verifyUser._id})
            return user
        }else{
            return "Failed"
        }
    } catch (error) {
        return "Failed"
    }
}

const getUserById = async(id)=>{
    try {
        const user  = await User.findOne({_id:id})
        if(user){
            return user
        }
        else{
            return "Failed"
        }
    } catch (error) {
        return "Failed"
    }
}



module.exports = {
    register,
    login,
    getUser,
    getUserById
}