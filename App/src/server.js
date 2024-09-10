/*
This page handles all of the database connections so the other pages just need to call functions created here.
We import mySQL, since that is the type of database we are using here
*/
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//create the connections with the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PWD', //CHANGE TO YOUR DATABASE PASSWORD
    database: 'HotelManagement'
});

//throw error if there is an error connecting
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

//code for getting reservation data
app.get('/reservations', (req, res) => {
    const sql = `
        SELECT Reservations.ReservationID, Guests.Name, Rooms.RoomID, Reservations.StartDate, Reservations.EndDate, RoomTypes.RoomTypeName, RoomTypes.Amenities
        FROM Reservations
        JOIN Guests ON Reservations.GuestID = Guests.GuestID
        JOIN Rooms ON Reservations.RoomID = Rooms.RoomID
        JOIN RoomTypes ON Rooms.RoomTypeID = RoomTypes.RoomTypeID
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//code for getting guest data
app.get('/guests', (req, res) => {
    const sql = 'SELECT * FROM Guests';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//code for getting room data
app.get('/rooms', (req, res) => {
    const sql = `
        SELECT Rooms.RoomID, RoomTypes.RoomTypeName, RoomTypes.Amenities
        FROM Rooms
        JOIN RoomTypes ON Rooms.RoomTypeID = RoomTypes.RoomTypeID
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//code for getting room type data
app.get('/roomtypes', (req, res) => {
    const sql = 'SELECT * FROM RoomTypes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//code for adding guest data
app.post('/guests', (req, res) => {
    const { Name, PhoneNumber, EmailAddress } = req.body;
    const sql = 'INSERT INTO Guests (Name, PhoneNumber, EmailAddress) VALUES (?, ?, ?)';
    db.query(sql, [Name, PhoneNumber, EmailAddress], (err, result) => {
        if (err) throw err;
        res.status(201).json({ GuestID: result.insertId });
    });
});

//code for adding room type data
app.post('/roomtypes', (req, res) => {
    const { RoomTypeName, Amenities } = req.body;
    const sql = 'INSERT INTO RoomTypes (RoomTypeName, Amenities) VALUES (?, ?)';
    db.query(sql, [RoomTypeName, Amenities], (err, result) => {
        if (err) throw err;
        res.status(201).json({ RoomTypeID: result.insertId });
    });
});

//code for adding room data
app.post('/rooms', (req, res) => {
    const { RoomTypeID } = req.body;
    const sql = 'INSERT INTO Rooms (RoomTypeID) VALUES (?)';
    db.query(sql, [RoomTypeID], (err, result) => {
        if (err) throw err;
        res.status(201).json({ RoomID: result.insertId });
    });
});

//code for adding reservation data
app.post('/reservations', (req, res) => {
    const { RoomID, GuestID, StartDate, EndDate } = req.body;
    const sql = 'INSERT INTO Reservations (RoomID, GuestID, StartDate, EndDate) VALUES (?, ?, ?, ?)';
    db.query(sql, [RoomID, GuestID, StartDate, EndDate], (err, result) => {
        if (err) throw err;
        res.status(201).json({ ReservationID: result.insertId });
    });
});

//code for updating reservation data
app.put('/reservations/:id', (req, res) => {
    const { id } = req.params;
    const { RoomID, GuestID, StartDate, EndDate } = req.body;
    const sql = `
        UPDATE Reservations 
        SET RoomID = ?, GuestID = ?, StartDate = ?, EndDate = ?
        WHERE ReservationID = ?
    `;
    db.query(sql, [RoomID, GuestID, StartDate, EndDate, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Reservation updated successfully' });
    });
});

//code for deleting reservation data
app.delete('/reservations/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Reservations WHERE ReservationID = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Reservation deleted successfully' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
