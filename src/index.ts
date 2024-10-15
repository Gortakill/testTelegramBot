import express from 'express'
import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import UserService from './model.service'

const userService = new UserService()
const app = express()
const TOKEN = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(TOKEN)

const port = process.env.PORT || 3000

app.use(express.json())

app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body), res.sendStatus(200)
})

bot.setWebHook(`${process.env.SERVER_URL}/bot${TOKEN}`)

app.listen(port, () => {
    console.log(`App statrting on port: ${port}`)
})

bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const user = await userService.createUser({chatId, username: msg.chat.first_name})
    if (text === '/start') {
        await userService.updateUserModel({chatId})
        await bot.sendMessage(chatId, 'Try to guess number', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '1', callback_data: '1' },
                        { text: '2', callback_data: '2' },
                        { text: '3', callback_data: '3' },
                    ],
                    [
                        { text: '4', callback_data: '4' },
                        { text: '5', callback_data: '5' },
                        { text: '6', callback_data: '6' },
                    ],
                    [
                        { text: '7', callback_data: '7' },
                        { text: '8', callback_data: '8' },
                        { text: '9', callback_data: '9' },
                    ],
                    [{ text: '0', callback_data: '0' }],
                ],
            },
        })
        bot.on('callback_query', async (msg) => {
            const random = await userService.findGame(msg.message.chat.id)
            if(random === Number(msg.data)){
                return bot.sendMessage(chatId, 'Congratulation, you win')
            }
            else{
                return bot.sendMessage(chatId, 'Try again')
            }
        })
    }
    if(text === '/info'){
        await bot.sendMessage(chatId, `Hello ${user.username}, your id is ${user.id}, your last game random number was ${user.randomNumber}`)
    }
})
