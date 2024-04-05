import app from './app.js'; // Se till att sökvägen är korrekt. Använd '.js' eller lämna bort beroende på din miljökonfiguration

// Middleware för att hantera CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Uppdatera för att matcha domänen från vilken förfrågningar kommer att göras
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* const port = 5080;

app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
}); */

const PORT = process.env.PORT || 5080;
app.listen(PORT, () => {
  console.log(`Servern lyssnar på port ${PORT}`);
});