/*Calendar page which uses react big calender to display reservations for the hotel in a by-date format.  
When a user click on any reservation, they can edit the reservation at the bottom of the screen
*/
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//Using the react moment library, we can make the dates appear on teh calendar 
const localizer = momentLocalizer(moment);

//Using the react useEffect library, we can change the state of items based on user actions
function CalendarPage() {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [guests, setGuests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [editedReservation, setEditedReservation] = useState({
        RoomID: '',
        GuestID: '',
        StartDate: '',
        EndDate: ''
    });

    //setting up the fetching of the information needed from the database to display the correct info in the calendar
    useEffect(() => {
        fetch('http://localhost:5000/reservations')
            .then(response => response.json())
            .then(data => {
                const events = data.map(reservation => ({
                    id: reservation.ReservationID,
                    title: `Reservation ${reservation.ReservationID} - Room ${reservation.RoomID}`,
                    start: new Date(reservation.StartDate),
                    end: new Date(reservation.EndDate),
                    allDay: true,
                    ...reservation,
                }));
                setReservations(events);
            });

        fetch('http://localhost:5000/guests')
            .then(response => response.json())
            .then(data => setGuests(data));

        fetch('http://localhost:5000/rooms')
            .then(response => response.json())
            .then(data => setRooms(data));

        fetch('http://localhost:5000/roomtypes')
            .then(response => response.json())
            .then(data => setRoomTypes(data));
    }, []);
    
//setting up what happens if a user clicks on a calendar item
    const handleSelectEvent = (event) => {
        setSelectedReservation(event);
        setEditedReservation({
            RoomID: event.RoomID,
            GuestID: event.GuestID,
            StartDate: event.StartDate.split('T')[0], 
            EndDate: event.EndDate.split('T')[0] 
        });
    };
//setting up what happens if a user edits a reservation (sending the data back to the db)
    const handleEditReservation = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/reservations/${selectedReservation.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedReservation)
        })
        .then(response => response.json())
        .then(data => {
            
            const updatedReservations = reservations.map(reservation => 
                reservation.id === selectedReservation.id ? { ...reservation, ...editedReservation, start: new Date(editedReservation.StartDate), end: new Date(editedReservation.EndDate) } : reservation
            );
            setReservations(updatedReservations);
            setSelectedReservation(null);
        });
    };
//setting up what happens if a user deletes a reservation (sending the data back to the db)
    const handleDeleteReservation = () => {
        fetch(`http://localhost:5000/reservations/${selectedReservation.id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            
            const updatedReservations = reservations.filter(reservation => reservation.id !== selectedReservation.id);
            setReservations(updatedReservations);
            setSelectedReservation(null);
        });
    };
    
//returning HTML for displaying the page
    return (
        <div>
            <h1>Reservations</h1>
            <Calendar
                localizer={localizer}
                events={reservations}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                onSelectEvent={handleSelectEvent}
            />
            
            {selectedReservation && (
                <div>
                    <h2>Edit Reservation</h2>
                    <form onSubmit={handleEditReservation}>
                        <label>
                            Change Guest:
                            <select value={editedReservation.GuestID} onChange={(e) => setEditedReservation({ ...editedReservation, GuestID: e.target.value })} required>
                                {guests.map(guest => (
                                    <option key={guest.GuestID} value={guest.GuestID}>{guest.Name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <br></br>
                            Room:
                            <select value={editedReservation.RoomID} onChange={(e) => setEditedReservation({ ...editedReservation, RoomID: e.target.value })} required>
                                {rooms.map(room => (
                                    <option key={room.RoomID} value={room.RoomID}>Room ID: {room.RoomID}, Type: {room.RoomTypeName}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                        <br></br>
                            Start Date:
                            <input type="date" value={editedReservation.StartDate} onChange={(e) => setEditedReservation({ ...editedReservation, StartDate: e.target.value })} required />
                        </label>
                        <label>
                        <br></br>
                            End Date:
                            <input type="date" value={editedReservation.EndDate} onChange={(e) => setEditedReservation({ ...editedReservation, EndDate: e.target.value })} required />
                        </label>
                        <br></br>
                        <button type="submit">Save Changes</button>
                        <br></br>
                        <button onClick={handleDeleteReservation}>Delete Reservation</button>
                    </form>
        
                </div>
            )}
        </div>
    );
}

export default CalendarPage;
