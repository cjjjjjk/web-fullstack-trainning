// import bcrypt from 'bcrypt'
import bcrypt from "bcrypt"
const saltRound = 10;

export const hashPassword_helper = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRound);
    } catch (err) {
        console.log("ERROR: ", err);
    }
}


export const comparePassword_helper = async (plainPassword: string, hashPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hashPassword)
    } catch (err) {
        console.log(err)
    }
}