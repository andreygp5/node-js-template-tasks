import config from './common/config';
import app from './app';
import connectToDB from './helpers/DBConnection';


const startApp = async () => {
  try {
    const connection = await connectToDB();
    console.log(`Is db connected - ${connection.isConnected}`);
    
    app.listen(config.PORT, () => {
      console.log(`App is running on http://localhost:${config.PORT}`)
    }
  );
  } catch (error) {
    throw new Error(`DB Connection failed - ${error}`);
  }
}

startApp();
