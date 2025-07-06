const http = require("http");

const options = {
  hostname: "localhost",
  port: process.env.PORT || 4000,
  path: "/api/auth/me",
  method: "GET",
  timeout: 2000,
};

const request = http.request(options, (res) => {
  if (res.statusCode === 401) {
    // 401 is expected for health check without auth token
    process.exit(0);
  } else if (res.statusCode >= 200 && res.statusCode < 500) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on("error", () => {
  process.exit(1);
});

request.on("timeout", () => {
  request.destroy();
  process.exit(1);
});

request.end();
