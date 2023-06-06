import app from "./app";
// import { env } from "./config";
import { AppDataSource } from "./db/data-source";
const PORT = 5000;

async function main() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database Connected!");
      app.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

main();
