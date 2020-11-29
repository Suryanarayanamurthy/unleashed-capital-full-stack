module.exports =
[
  {
    "name": "auth",
    "host": process.env.SERVICE_AUTH || "localhost",
    "port": "4200",
    "protocol": "http",
    "rootPath": "auth",
  },
  {
    "name": "user",
    "host": process.env.SERVICE_USER || "localhost",
    "port": "4011",
    "protocol": "http",
    "rootPath": "user",
  }
]