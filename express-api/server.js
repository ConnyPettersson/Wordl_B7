import app from "./app.js";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 5080;
app.listen(PORT, () => {
  console.log(`Servern lyssnar på port ${PORT}`);
});
