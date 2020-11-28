export default
[
  {
    "name": "auth",
    "host": process.env.SERVICE_AUTH || "localhost",
    "port": "4010",
    "protocol": "http",
    "rootPath": "auth",
    "endpoints": [],
  },
  {
    "name": "user",
    "host": process.env.SERVICE_USER || "localhost",
    "port": "4011",
    "protocol": "http",
    "rootPath": "user",
  }
]