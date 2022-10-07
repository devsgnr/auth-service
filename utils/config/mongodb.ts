import env from "../env";

const db = {
  url: `mongodb+srv://voto:${env.db.password}@voto-cluster-0.0rg1c.mongodb.net/?retryWrites=true&w=majority`,
};

export default db;
