module.exports =
[
  {
    "name": "auth",
    "host": process.env.SERVICE_AUTH || "localhost",
    "port": "5001",
    "protocol": "http",
    "rootPath": "auth",
  },
  {
    "name": "user",
    "host": process.env.SERVICE_USER || "localhost",
    "port": "5002",
    "protocol": "http",
    "rootPath": "user",
  }
]