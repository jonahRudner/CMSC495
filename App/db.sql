--Create table that stores guest information
CREATE TABLE Guests (
    GuestID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20),
    EmailAddress VARCHAR(255)
);
--Create table that stores room type information (ie large room, king suite, etc)
CREATE TABLE RoomTypes (
    RoomTypeID INT PRIMARY KEY AUTO_INCREMENT,
    RoomTypeName VARCHAR(255) NOT NULL,
    Amenities TEXT
);

--Create table that stores physical rooms, and the id for which type they are
CREATE TABLE Rooms (
    RoomID INT PRIMARY KEY AUTO_INCREMENT,
    RoomTypeID INT,
    FOREIGN KEY (RoomTypeID) REFERENCES RoomTypes(RoomTypeID)
);

--Create table that stores reservations, including the guest and which room
CREATE TABLE Reservations (
    ReservationID INT PRIMARY KEY AUTO_INCREMENT,
    RoomID INT,
    GuestID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (GuestID) REFERENCES Guests(GuestID)
);
