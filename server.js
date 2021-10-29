const cors = require('cors');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
