const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../utils/utils');


router.get('/', (req, res) => 
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))  
);

router.post('/', (req, res) => {
    const { noteName, note } = req.body;
    if (noteName && note) {
        const newNote = {
            noteName,
            note,
          };
          readAndAppend(newNote, './db/db.json');

          const response = {
            status: 'success',
            body: newNote,
          };
      
          res.json(response);
        } else {
          res.json('Error in posting feedback');
        }
      });

module.exports = router;