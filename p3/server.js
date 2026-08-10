const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db.js');
const passport = require('./config/passport.js');
const { AppError } = require('./utils/errors.js');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

app.set('trust proxy', 1);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: !!process.env.RENDER_EXTERNAL_HOSTNAME,
      sameSite: 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes/index');

try {
   // Load the Swagger file.
  const swaggerDocument = require('./swagger.json');

  // Update host and protocol for the current request.
  const getSwaggerDocument = (req) => ({
    ...swaggerDocument,
    host: req.get('host'),
    schemes: [req.protocol],
  });

  // Serve Swagger UI with the updated configuration.
  app.use('/api-docs', swaggerUi.serve, (req, res, next) =>
    swaggerUi.setup(getSwaggerDocument(req))(req, res, next)
  );

  // Return the updated Swagger JSON.
  app.get('/swagger.json', (req, res) => res.json(getSwaggerDocument(req)));
} catch (err) {
  console.log('swagger.json not found, run "npm run swagger" to generate it. /api-docs will not be available.');
}

app.use('/', routes);

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database is connected and server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });