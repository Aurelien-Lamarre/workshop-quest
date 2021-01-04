const { Router } = require('express');
const port = 3000;
const connection = require("./../config");

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.send("Welcome to this workshop");
});

// GET ALL PEOPLE
router.get('/api/people', (req, res ) => {
  connection.query('SELECT * FROM mytable', (err, results) => {
    if(err){
      res.status(500).send('Error retrieving data');
      console.log(err)
    }else {
      res.status(200).json(results)
    }
  })
});

router.get('/api/people/name', (req, res ) => {
  connection.query('SELECT name FROM mytable', (err, results) => {
    if(err){
      res.status(500).send('Error retrieving data');
      console.log(err)
    }else {
      res.status(200).json(results)
    }
  })
});

router.get('/api/people/:id', (req, res) => {
  const people_id = req.params.id;
  connection.query('SELECT * FROM mytable WHERE id=?', [people_id],
    (err, results) => {
      if (err) {
        res.status(500).send('Something is broken!');
      } else {
        res.status(200).send(results);
      }
    }
  )
});

router.get('/api/people/m', (req, res) => {
  const people_name = req.params.name;
  connection.query('SELECT name FROM mytable WHERE name LIKE "m%"', [people_name],
    (err, results) => {
      if (err) {
        res.status(500).send('Something is broken!');
      } else {
        res.status(200).send(results);
      }
    }
  )
});

router.get('/api/people/a', (req, res) => {
  const people_name = req.params.name;
  connection.query('SELECT name FROM mytable WHERE name LIKE "%a%"', [people_name],
    (err, results) => {
      if (err) {
        res.status(500).send('Something is broken!');
      } else {
        res.status(200).send(results);
      }
    }
  )
});

router.get('/api/people/sorted', (req, res) => {
  connection.query('SELECT * FROM mytable WHERE date > "09/12/20"',
    (err, results) => {
      if(err){
        res.status(500).send('Error retrieving data');
        console.log(err)
      }else {
        res.status(200).json(results)
      }
  })
})

router.post('/api/people', (req, res) => {
  const { name, date, adult, age } = req.body;
  connection.query('INSERT INTO mytable(name, date, adult, age) VALUES (? ,? ,? ,?)' , 
  [name, date, adult, age], 
  (err, results) => {
    if (err){
      console.log(err);
      res.status(500).send("Error saving a wilder");
    }else{
      res.status(200).send("Successfully saved");
    }
  }
  )
});

// PUT : MODIFY PEOPLE
router.put('/api/people/:id', (req, res) => {
  const peopleId = req.params.id;

  const newPeople = req.body;

  connection.query(
    'UPDATE mytable SET ? WHERE id=?',
    [newPeople, peopleId],
    (err, results) => {
      if(err){
        res.status(500).send('Error sorry')
      }else{
        res.status(201).send('Succesfully update')
      }
    }
  )
});

router.put('/api/people/adult/:id', (req, res) => {
  connection.query(
    'UPDATE mytable SET adult = No WHERE id=?',
    [req.params.id],
    (err, results) => {
      if(err){
        console.log(err);
        res.status(500).send('error brooo')
      }else{
        res.status(200).send('Yes, wellplayed')
      }
    }
  )
});

// DELETE A PEOPLE
app.delete('/api/people/:id', (req, res) => {
  const idPeople = req.params.id; 
  connection.query(
    'DELETE FROM mytable WHERE id=?',
    [idPeople],
    (err, results) =>{
      if (err){
        res.status(500).send('NOP')
      }else{
        res.status(200).send('You did it')
      }
    }
  )
});

// DELETE ALL WILDERS WHERE ADULT: No
router.delete('/api/people', (req, res)=> {
  connection.query(
    'DELETE FROM people WHERE adult = "No"',
    (err, results) => {
      if (err){
        console.log(err);
        res.status(500).send('Nope')
      }else{
        res.status(200).send('GG')
      }
    }
  )
})

module.exports = router;
