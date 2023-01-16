import express from 'express';
import { config } from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
import { handleError } from 'req-error';

const app = express();

config({ path: '.env' });
const PORT = process.env.PORT || 8000;

//middlewares
import httpResponder from './middleware/httpResponder.js';
import { getBody } from './middleware/reqUtils.js';

//routes
import editRoute from './routes/edit.js';
import authRoute from './routes/auth.js';

app.set('env', process.env.NODE_ENV);
app.set('json spaces', 2);
// app.set('trust proxy', 1);
// app.set('x-powered-by', false);
// app.set('case sensitive routing', true);
// app.set('strict routing', true);
// app.set('view cache', true);
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// ----  set and Add Middleware -- //

app.use(httpResponder);
app.request.getBody = getBody;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: { error: 'Too many requests!, please try again after 25mins' },
});
app.use('/api/', globalLimiter);

app.use(morgan('dev'));

// ---- ROUTES ----- //
app.use('api/auth', authRoute);
app.use('/api/edit', editRoute);

app.use('*', (req, res) => {
  res.send('Page Not Found');
});

handleError(app);

export default app;

/*
express-mongo-sanitize
express-static-gzip
compression
@sendgrid/mail

passport
cookie-parser
body-parser
mongoose
*/
