import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Server running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
