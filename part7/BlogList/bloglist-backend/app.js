const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");
const middleware = require("./utils/middleware");
const app = express();

logger.info("connecting to", config.MONGODB_URI);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());
//app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs/:id/comments", blogsRouter);

if (process.env.NODE_ENV === "development") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
