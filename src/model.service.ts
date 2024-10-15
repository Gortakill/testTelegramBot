import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().userCountTry

class UserService {
    async createUser(data){
        const candidate = await userClient.findUnique({where: {chatId: data.chatId}})
        if(!candidate){
            const user = await userClient.create(data)
            return user
        }
        return candidate
    }
    async updateUserModel(data){
        const candidate = await userClient.findUnique({where: {chatId: data.chatId}})
        if(!candidate.randomNumber){
            const user = await userClient.update({where: {chatId: data.chatId}, data: {randomNumber: Math.ceil(Math.random() * 10)}})
            return user.randomNumber
        }
        return candidate.randomNumber
    } 

    async findGame(chatId){
        const random = await userClient.findUnique({where: {chatId}})
        return random.randomNumber
    }
}

export default UserService