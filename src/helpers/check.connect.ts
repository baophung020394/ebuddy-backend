import { Sequelize } from "sequelize";
import os from "os";
import process from "process";
const _SECONDS = 5000;

// count connect
const countConnect = () => {
  const numConnection = Sequelize.length;
  console.log(`Number of connections::${numConnection}`);
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnection = Sequelize.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    // Example maximums number of connections based on number of cores
    const maxConnections = numCores * 5;

    console.log(`Active connections::${numConnection}`);
    console.log(`Memory usage::${memoryUsage / 1024 / 1024} MB`);
    if (numConnection > maxConnections) {
      console.log(`Connection overload detected`);
    }
  }, _SECONDS);
};

export { countConnect, checkOverload };
