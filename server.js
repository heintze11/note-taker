// required dependencies
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


//set up port
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// send the db file to the html
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
  });

  // read db file, then create new entry, then add entry to db file
app.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  const newNote = req.body;
  newNote.id = uuidv4();
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
})

// Delete function based on ID
app.delete('/api/notes/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  
  const deleteNote = notes.filter((removeNote) => removeNote.id !== req.params.id);

  fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
  res.json(deleteNote);
})

// Send the index.html to load page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Send the notes.html to load when at /notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Catch all to default to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
