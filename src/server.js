import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
})
  