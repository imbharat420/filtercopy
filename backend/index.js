import express from 'express';
import { config } from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

config({ path: '.env' });
const PORT = process.env.PORT || 8000;

//middlewares
import httpResponder from './middleware/httpResponder.js';

//routes
import editRoute from './routes/edit.js';
import authRoute from './routes/auth.js';

/* DB */

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

app.use(httpResponder);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  '/api/',
  rateLimit({
    windowMs: 25 * 60 * 1000,
    max: 500,
    message: { error: 'Too many requests!, please try again after 25mins' },
  })
);

app.use(morgan('dev'));

app.use('api/auth', authRoute);

app.use('/api/edit', editRoute);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`${PORT}`);
});

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
