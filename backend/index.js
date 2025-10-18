import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
