const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Assurez-vous que le dossier logs existe
const logDir = path.join(__dirname, "persistent_logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

app.get("/", (req, res) => {
  const logMessage = `${new Date().toISOString()} - Accessed /\n`;
  const logFilePath = path.join(logDir, "access.log");

  // Écriture asynchrone dans le fichier de log
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Erreur d'écriture dans le fichier de log:", err);
    }
  });

  res.send("Hello, Kubernetes!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

