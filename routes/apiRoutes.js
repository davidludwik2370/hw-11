let notes = require('../db/db.json');
console.log(notes);
var fs = require('fs');

module.exports = function(app) {
    // code here
    app.get('/api/notes', (req, res) => res.json(notes));

    app.post('/api/notes', (req, res) => {
        let note = req.body;
        note["id"] = Math.floor(Math.random() * 1000000).toString();
        notes.push(note);
        console.log('notes', notes);
        fs.writeFile ("./db/db.json", JSON.stringify(notes), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
        res.json(note);
    })

    app.delete('/api/notes/:id', (req, res) => {
        let id = req.params.id;
        for(i=0; i<notes.length; i++){
            if(notes[i].id === id){
                notes.splice(i,1);
            }
        }
        fs.writeFile ("./db/db.json", JSON.stringify(notes), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
        res.json(notes);
    })
}