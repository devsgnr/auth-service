import env from "../env";

/* 
Replace `url` with the pattern; {env.db.password} coming from the `env` obj
Copy this and paste -> mongodb+srv://example:${env.db.password}@example.mongodb.net/?retryWrites=true&w=majority
And make necessary changes :)
*/
const db = {
  url: ``,
};

export default db;
