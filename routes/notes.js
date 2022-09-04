const router = require('express').Router();

router.get('/', (req, res) => 
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))  
);

router.post('/', (req, res) => {
    
})

module.exports = router;