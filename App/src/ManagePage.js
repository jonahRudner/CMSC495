import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [guests, setGuests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [reservations, setReservations] = useState([]);
    
   
    const [newGuest, setNewGuest] = useState({ Name: '', PhoneNumber: '', EmailAddress: '' });
    const [newRoomType, setNewRoomType] = useState({ RoomTypeName: '', Amenities: '' });
    const [newRoom, setNewRoom] = useState({ RoomTypeID: '' });
    const [newReservation, setNewReservation] = useState({ RoomID: '', GuestID: '', StartDate: '', EndDate: '' });

    useEffect(() => {
        fetch('http://localhost:5000/guests')
            .then(response => response.json())
            .then(data => setGuests(data));
        fetch('http://localhost:5000/rooms')
            .then(response => response.json())
            .then(data => setRooms(data));
        fetch('http://localhost:5000/roomtypes')
            .then(response => response.json())
            .then(data => setRoomTypes(data));
        fetch('http://localhost:5000/reservations')
            .then(response => response.json())
            .then(data => setReservations(data));
    }, []);

    
    const handleAddGuest = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/guests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGuest)
        })
        .then(response => response.json())
        .then(data => setGuests([...guests, { ...newGuest, GuestID: data.GuestID }]));
    };

    const handleAddRoomType = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/roomtypes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRoomType)
        })
        .then(response => response.json())
        .then(data => setRoomTypes([...roomTypes, { ...newRoomType, RoomTypeID: data.RoomTypeID }]));
    };

    const handleAddRoom = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRoom)
        })
        .then(response => response.json())
        .then(data => setRooms([...rooms, { ...newRoom, RoomID: data.RoomID }]));
    };

    const handleAddReservation = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReservation)
        })
        .then(response => response.json())
        .then(data => setReservations([...reservations, { ...newReservation, ReservationID: data.ReservationID }]));
    };

    return (
        <div className="App">
            <h1>Hotel Management</h1>
            
            <h2>Guests</h2>
            <form onSubmit={handleAddGuest}>
                <input type="text" name="Name" placeholder="Name" onChange={e => setNewGuest({ ...newGuest, Name: e.target.value })} required />
                <input type="text" name="PhoneNumber" placeholder="Phone Number" onChange={e => setNewGuest({ ...newGuest, PhoneNumber: e.target.value })} required />
                <input type="email" name="EmailAddress" placeholder="Email" onChange={e => setNewGuest({ ...newGuest, EmailAddress: e.target.value })} required />
                <button type="submit">Add Guest</button>
            </form>
            <ul>
                {guests.map(guest => (
                    <li key={guest.GuestID}>{guest.Name} - {guest.PhoneNumber} - {guest.EmailAddress}</li>
                ))}
            </ul>
            
            <h2>Room Types</h2>
            <form onSubmit={handleAddRoomType}>
                <input type="text" name="RoomTypeName" placeholder="Room Type Name" onChange={e => setNewRoomType({ ...newRoomType, RoomTypeName: e.target.value })} required />
                <input type="text" name="Amenities" placeholder="Amenities" onChange={e => setNewRoomType({ ...newRoomType, Amenities: e.target.value })} required />
                <button type="submit">Add Room Type</button>
            </form>
            <ul>
                {roomTypes.map(roomType => (
                    <li key={roomType.RoomTypeID}>{roomType.RoomTypeName} - {roomType.Amenities}</li>
                ))}
            </ul>

            <h2>Rooms</h2>
            <form onSubmit={handleAddRoom}>
                <select name="RoomTypeID" onChange={e => setNewRoom({ ...newRoom, RoomTypeID: e.target.value })} required>
                    <option value="">Select Room Type</option>
                    {roomTypes.map(roomType => (
                        <option key={roomType.RoomTypeID} value={roomType.RoomTypeID}>
                            {roomType.RoomTypeName}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Room</button>
            </form>
            <ul>
                {rooms.map(room => (
                    <li key={room.RoomID}>Room ID: {room.RoomID}, Type: {room.RoomTypeName}, Amenities: {room.Amenities}</li>
                ))}
            </ul>

            <h2>Reservations</h2>
            <form onSubmit={handleAddReservation}>
                <select name="RoomID" onChange={e => setNewReservation({ ...newReservation, RoomID: e.target.value })} required>
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                        <option key={room.RoomID} value={room.RoomID}>
                            Room ID: {room.RoomID}, Type: {room.RoomTypeName}
                        </option>
                    ))}
                </select>
                <select name="GuestID" onChange={e => setNewReservation({ ...newReservation, GuestID: e.target.value })} required>
                    <option value="">Select Guest</option>
                    {guests.map(guest => (
                        <option key={guest.GuestID} value={guest.GuestID}>
                            {guest.Name}
                        </option>
                    ))}
                </select>
                <input type="date" name="StartDate" onChange={e => setNewReservation({ ...newReservation, StartDate: e.target.value })} required />
                <input type="date" name="EndDate" onChange={e => setNewReservation({ ...newReservation, EndDate: e.target.value })} required />
                <button type="submit">Add Reservation</button>
            </form>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.ReservationID}>
                        Reservation ID: {reservation.ReservationID}, Room ID: {reservation.RoomID}, Guest: {reservation.Name}, Start Date: {reservation.StartDate}, End Date: {reservation.EndDate}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
