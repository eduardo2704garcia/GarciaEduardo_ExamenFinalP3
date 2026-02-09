const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Integracion continua');
});

app.listen(port, () => {
  console.log(`Serveidor corriendo en http://localhost:${port}`);
});