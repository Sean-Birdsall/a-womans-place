var express = require('express');
var PORT = process.env.PORT || 80;
var app = express();

app.use(express.static('public'));

app.listen(PORT, (err) =>{
  if (err){
    console.log('Server error:', err);
  } else {
    console.log(`Server up and running on port: ${PORT}`);
  }
})
