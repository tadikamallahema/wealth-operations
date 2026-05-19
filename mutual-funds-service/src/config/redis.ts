import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6379"
});

redisClient.on("connect", () => {

  console.log("Redis Connected ✅");

});

redisClient.on("error", (err) => {

  console.log("Redis Error ❌");

  console.error(err);

});

export async function connectRedis() {

  await redisClient.connect();

}