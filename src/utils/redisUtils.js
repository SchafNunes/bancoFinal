
import redis from "../config/index.js";

function setCache(key, value, expiration) {
  redis.set(key, JSON.stringify(value), 'EX', expiration);
}

async function getCache(key) {
  const data = await redis.get(key);
  if (data) return JSON.parse(data);
  return null;
}

function deleteCache(key) {
  return new Promise((resolve, reject) => {
      redis.del(key, (err, response) => {
          if (err) {
              reject(err);
          } else {
              resolve(response);
          }
      });
  });
}


export { setCache, getCache, deleteCache };