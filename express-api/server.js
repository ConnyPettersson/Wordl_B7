// const express = require('express');
// const app = express();
// const port = 5080; // Du kan välja en port som passar för din applikation

// // Middleware för att tolka JSON och urlencoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/api/words', (req, res) => {
//   // Din logik för att hämta och skicka ordlistan går här
//   // Exempelvis, hämta ord från en databas eller en fil och skicka dem som respons
//   res.json({ words: ['apple', 'banana', 'cherry'] }); // Skicka en exempelordlista som respons
// });


// // Starta servern
// app.listen(port, () => {
//   console.log(`Servern lyssnar på port ${port}`);
// });

const express = require('express');
// Importera app-instansen från app.js
const app = require('./app'); // Uppdatera sökvägen så att den matchar platsen för din app.js-fil

const port = 5080; // Du kan välja en port som passar för din applikation

// Starta servern med app-konfigurationen
app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});