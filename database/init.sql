IF DB_ID('RestaurantDb') IS NULL
BEGIN
    CREATE DATABASE RestaurantDb;
END
GO

USE RestaurantDb;
GO

IF OBJECT_ID('Roles', 'U') IS NULL
BEGIN
    CREATE TABLE Roles (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(50) NOT NULL
    );
END
GO

IF OBJECT_ID('Users', 'U') IS NULL
BEGIN
    CREATE TABLE Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(200) NOT NULL,
        RoleId INT NOT NULL,
        FOREIGN KEY (RoleId) REFERENCES Roles(Id)
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = 'administrador')
BEGIN
    INSERT INTO Roles (Name) VALUES ('administrador');
END
IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = 'caixa')
BEGIN
    INSERT INTO Roles (Name) VALUES ('caixa');
END
IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = 'garcom')
BEGIN
    INSERT INTO Roles (Name) VALUES ('garcom');
END
IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = 'cozinha')
BEGIN
    INSERT INTO Roles (Name) VALUES ('cozinha');
END
GO

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@restaurante.com')
BEGIN
    INSERT INTO Users (Name, Email, PasswordHash, RoleId)
    VALUES ('Administrador', 'admin@restaurante.com', 'Admin@123', 1);
END
