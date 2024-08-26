CREATE TABLE Guests (
    GuestID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20),
    EmailAddress VARCHAR(255)
);

CREATE TABLE RoomTypes (
    RoomTypeID INT PRIMARY KEY AUTO_INCREMENT,
    RoomTypeName VARCHAR(255) NOT NULL,
    Amenities TEXT
);

CREATE TABLE Rooms (
    RoomID INT PRIMARY KEY AUTO_INCREMENT,
    RoomTypeID INT,
    FOREIGN KEY (RoomTypeID) REFERENCES RoomTypes(RoomTypeID)
);

CREATE TABLE Reservations (
    ReservationID INT PRIMARY KEY AUTO_INCREMENT,
    RoomID INT,
    GuestID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (GuestID) REFERENCES Guests(GuestID)
);
