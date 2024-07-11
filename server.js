// server.js (create this file in the root of your project)
const app = require('./api/index');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
