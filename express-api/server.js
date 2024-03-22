
const app = require('./app'); // Uppdatera sökvägen så att den matchar platsen för din app.js-fil

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const port = 5080; // Du kan välja en port som passar för din applikation

// Starta servern med app-konfigurationen
app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});