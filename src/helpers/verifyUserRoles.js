const verifyUserRoles = async (user, role) =>{
    const member = user;
    
    const memberRoles = member.roles.cache.find((roles) => roles.id === role);

    if(!memberRoles) return false;
    
    
    return true;
}

module.exports = {
    verifyUserRoles: verifyUserRoles
}