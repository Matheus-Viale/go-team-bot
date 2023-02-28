import {GuildMember} from 'discord.js'

const verifyUserRoles = async (user: GuildMember, role: string) =>{
    
    const memberRoles = user.roles.cache.find((roles) => roles.id === role);

    if(!memberRoles) return false;
    
    
    return true;
}

export default verifyUserRoles;