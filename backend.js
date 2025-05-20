const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const reactAppPath = path.join(__dirname, 'build')
console.log(reactAppPath);

app.use(express.static(reactAppPath))

app.get('*', async (req, res) => {
  res.sendFile(path.join(reactAppPath, 'index.html'))
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
