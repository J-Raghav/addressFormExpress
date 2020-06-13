const express = require('express');
const { query, checkSchema, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const request = require('request')

const app = express();

const Address = require('./models/address');
const { validationRules } = require('./objects')
const API_KEY = process.env.API_KEY;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/dev', { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
   console.log((error) ? 'Connection failed: Can\'t connect to Database':'Database Connected');
});

app.get('/',function(req,res){
  res.render('home');
});

// Route for fetching addreses form database and rendering on client side
app.get('/:userId/addresses',checkSchema({userId:validationRules.userId}),function(req,res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
  }

  const userId = req.params.userId;

  Address.find({ userId: userId }, -'_id', function(err,addresses){
    if (err){
      return res.status(500).json({msg:'fail',err: "Internal server error"});
    }
    return res.render('address', { addresses: addresses, userId: userId });
  });

});

// Route for rendering address form
app.get('/:userId/addresses/form',checkSchema({userId:validationRules.userId}),function(req,res){
    return res.render('form',{ userId: req.params.userId, errors:[] })
});


// Route for posting data to database
app.post('/:userId/addresses', checkSchema(validationRules), function(req,res){
  //console.log(req.body);
  const errors = validationResult(req);
  const userId = req.params.userId;
  if (!errors.isEmpty()) {
    return res.render('form',{ errors: errors.errors, userId:req.params.userId });
  }

  Address.create({ userId: userId, ...req.body})
  .then(function(data){
    return res.redirect(`/${userId}/addresses`);
  })
  .catch( err=>{
    return res.send("Unexpected Error");
  });

});

// Route for fetching data from external API
app.get('/getlocation',query('latLong').trim().isLatLong(),function(req,res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
  }
  let lat = req.query.latLong.split(',')[0];
  let lng = req.query.latLong.split(',')[1];

  request(`https://api.geodatasource.com/city?key=${API_KEY}&lat=${lat}&lng=${lng}`, function (error, response, body) {
          if (error)
            res.status(500).json({
              msg:'fail',
              detail:'Somthing went wrong'
            });
          body = JSON.parse(body);

          if (response.statusCode && body.region && body.city) // Print the response status code if a response was received
            res.status(200).json({
                msg:'success',
                state:body.region,
                city:body.city
            });
          else {
            res.status(500).json({
              msg: 'fail',
              error: body.error
            });
          }
    });
});

app.listen(process.env.PORT || 3000, function(){
	console.log(process.env.PORT);
});
