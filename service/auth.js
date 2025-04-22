//const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Progga1234";

function setUser(id,user){
const payload = {
    id,...user
};
return jwt.sign(payload,secret)
}

function getUser(id){
   
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser, getUser
}