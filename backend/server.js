const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.json({ output: "No code provided" });
  }

  try {
    fs.writeFileSync("script.pl", code);

    exec("perl script.pl", (err, stdout, stderr) => {
      if (err) {
        return res.json({
          output: stderr || err.message
        });
      }

      res.json({
        output: stdout || "No output"
      });
    });

  } catch (e) {
    res.json({ output: e.message });
  }
});

app.listen(5000, () => {
  console.log("Perl backend running on http://localhost:5000");
});