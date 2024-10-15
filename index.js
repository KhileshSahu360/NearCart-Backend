import connectDB from './src/db/dbConfig.js'
import app from './app.js';

const PORT = process.env.PORT || 3000
const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
      });
    } catch (err) {
      console.log("MONGO db connection failed !!! ", err);
    }
  };
  
  startServer();
  