
//jedino sto smo promenili za production jeste da smo dodali heroku u package.json na server strani (mogli smo i ono
// sa build na client strani), ovde dodali path, izbrisali API running, dodali serve static assets in production
//heroku smo aktivirali tako sto smo skinuli herokuCLI i u terminalu upisali heroku login
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
