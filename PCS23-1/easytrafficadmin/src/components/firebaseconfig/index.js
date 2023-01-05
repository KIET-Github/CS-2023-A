
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyBRIVVM49RBcQb-o5x6P7LZkDk9EO6RgPQ",
        authDomain: "easytraffic-42345.firebaseapp.com",
        databaseURL: "https://easytraffic-42345-default-rtdb.firebaseio.com",
        projectId: "easytraffic-42345",
        storageBucket: "easytraffic-42345.appspot.com",
        messagingSenderId: "208675801849",
        appId: "1:208675801849:web:497fb4acfe77f3bd8cf028",
        measurementId: "G-NPWSNH7DNM"
      };
      
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);
}

export default StartFirebase;

