import Firebase from "firebase";
import uuid from "uuid";

const config = {
  apiKey: "AIzaSyDQUtTaNRev3uFTKgmia-ePFKUWAIrU3gA",
  authDomain: "quickgesture-16c1a.firebaseapp.com",
  databaseURL: "https://quickgesture-16c1a.firebaseio.com",
  projectId: "quickgesture-16c1a",
  storageBucket: "quickgesture-16c1a.appspot.com",
  messagingSenderId: "45971962536"
}

export class Bucket {
    app = Firebase.initializeApp(config);
    storage = this.app.storage("gs://quickgesture-16c1a.appspot.com/");
    db = this.app.database();

    // Usage: upload("base64string...").then((snapshot) => ...)
    upload(blob, obj) {
        const id = uuid();
        const imageRef = this.storage.ref().child(`images/${id}.jpg`);
        this.db.ref().push({
            fileName:id,
            reactionName: obj
        });
        return imageRef.putString(blob, 'base64');
    }


}

