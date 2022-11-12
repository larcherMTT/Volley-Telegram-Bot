// Requiring module
const express = require('express');
const path = require('path');
const router = express.Router();
 
// Creating express object
const app = express();
 
// Defining port number
const PORT = 3001;                 
 
// Function to serve all static files in
// local directories.
app.use('/pubblic',express.static('pubblic')); 
app.use('/images',express.static('images')); 

//assuming app is express Object.
router.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  });
 
// Server setup
app.use('/', router);
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
})