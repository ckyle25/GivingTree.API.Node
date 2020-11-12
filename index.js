require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , cors = require('cors')
    , nodemailer = require('nodemailer')
const { Pool, Client } = require('pg')
const { getCards,
        reserveCard,
        releaseCard,
        addCard,
        deleteCard } =require('./controllers/givingTreeController')

const app = express();
const connectionString = process.env.CONNECTION_STRING

const pool = new Pool({
  connectionString,
})

app.set('db', pool)
const publicweb = process.env.PUBLICWEB || './publicweb';

app.use( bodyParser.json() );
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
      next();
  }
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(publicweb))

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_SERVICE_USERNAME,
    pass: process.env.EMAIL_SERVICE_PASSWORD
  }
});

 const awl = ''; //new AmazonWishList();

app.set('transporter', transporter);
app.set('awl', awl);

const baseUrl = '/api';

// Giving Tree Endpoints
app.get(`${baseUrl}/getCards`, getCards);
app.put(`${baseUrl}/reserveCard`, reserveCard)
app.put(`${baseUrl}/releaseCard`, releaseCard)
app.post(`${baseUrl}/addCard`, addCard)
app.delete(`${baseUrl}/deleteCard`, deleteCard)

// // Shared API Endpoints
// app.get(`${baseUrl}/authConfig`, getConfig);
// app.get(`${baseUrl}/shared/getAdmin`, checkAuthenticated, getAdmin);
// app.post(`${baseUrl}/shared/getuser`, checkAuthenticated, getUser);
// app.post(`${baseUrl}/shared/requestAccess`, checkAuthenticated, requestAccess);
// app.post(`${baseUrl}/shared/giveFeedback`, checkAuthenticated, giveFeedback);
// app.put(`${baseUrl}/shared/updateUser`, checkAuthenticated, updateEdwUser);

// // Wishes API Endpoints
// app.get(`${baseUrl}/wishes/getAllUsers`, checkAuthenticated, getAllUsers);
// app.get(`${baseUrl}/wishes/getFamilyReference`, checkAuthenticated, getFamilyReference);
// app.post(`${baseUrl}/wishes/getActiveUser`, checkAuthenticated, getActiveUser);
// app.post(`${baseUrl}/wishes/getWishes`, checkAuthenticated, getWishes);
// app.post(`${baseUrl}/wishes/reserveWish`, checkAuthenticated, reserveWish);
// app.post(`${baseUrl}/wishes/releaseWish`, checkAuthenticated, releaseWish);
// app.post(`${baseUrl}/wishes/completeWish`, checkAuthenticated, completeWish);
// app.post(`${baseUrl}/wishes/reactivateWish`, checkAuthenticated, reactivateWish);
// app.post(`${baseUrl}/wishes/addWish`, checkAuthenticated, addWish);
// app.post(`${baseUrl}/wishes/deleteWish`, checkAuthenticated, deleteWish);
// app.put(`${baseUrl}/wishes/updateWish`, checkAuthenticated, updateWish);
// app.post(`${baseUrl}/wishes/getReservedWishes`, checkAuthenticated, getReservedWishes);
// app.post(`${baseUrl}/shared/getuser`, checkAuthenticated, getUser);
// app.put(`${baseUrl}/wishes/updateBio`, checkAuthenticated, updateBio);
// app.put(`${baseUrl}/wishes/updateUser`, checkAuthenticated, updateWishesUser);
// app.put(`${baseUrl}/wishes/updateFamily`, checkAuthenticated, updateWishesFamily);
// app.post(`${baseUrl}/wishes/getReserverEmail`, checkAuthenticated, getReserverEmail);
// app.post(`${baseUrl}/wishes/emailReserver`, checkAuthenticated, emailReserver);
// app.post(`${baseUrl}/wishes/getAmazonWishes`, checkAuthenticated, getAmazonWishes);
// app.post(`${baseUrl}/wishes/getMyCompletedWishes`, checkAuthenticated, getMyCompletedWishes);

// // Food API Endpoints
// app.post(`${baseUrl}/food/getActiveUser`, checkAuthenticated, foodGetActiveUser);

const port = process.env.PORT || 3001
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
