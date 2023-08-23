require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const path = require("path")
const fileUPload = require("express-fileupload")

const connectDB = require("./db/connectDB")

const photoRouter = require("./routes/photo.routes")

const notFountErrorMiddleware = require("./middleware/not-found")
const ErrorHanderMiddleware = require("./middleware/error-handler")

app.set('trust proxy', 1);

app.use(express.static(path.resolve(__dirname, "./client/dist")))
app.use(express.json())
app.use(fileUPload({ useTempFiles: true }))

app.use("/api/v1/fileUpload", photoRouter)
app.get('*', (req, res) => {
 res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use(notFountErrorMiddleware)
app.use(ErrorHanderMiddleware)

const PORT = process.env.PORT || 5000
const start = async () => {
 try {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, () => console.log(`server is running on port : ${PORT}`))
 } catch (err) {
  console.log("something went wrong", err);
 }
}
start()