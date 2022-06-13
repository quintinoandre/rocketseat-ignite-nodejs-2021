**FR** (Functional requirements) (Requisitos funcionais)
**NFR** (Non-functional requirements) (Requisitos não funcionais)
**BR** (Business rule) (Regra de negócio)

---

# Car registration

**FR**

- [x] It should be possible to register a new car

**RN**

- [x] It should not be possible to register a car with an existing license plate
- [x] The car must be registered with availability by default
- [x] The user responsible for the registration of a car must be an administrator

---

# Car listing

**FR**

- [x] It should be possible to list all available cars
- [x] It must be possible to list all cars available by the category name
- [x] It must be possible to list all cars available by the brand name
- [x] It must be possible to list all cars available by the car name

**RN**

- [x] The user does not need to be logged in to list the available cars

---

# Car specification register

**FR**

- [x] It should be possible to register a specification for a car

**RN**

- [x] It should not be possible to register a specification for an unregistered car
- [x] It should not be possible to register an existing specification for the same car
- [x] The user responsible for the registration of a specification must be an administrator

---

# Car Image Registration

**FR**

- [x] It should be possible to register the image of the car

**NFR**

- [x] Use Multer to Upload Files

**RN**

- [x] The user must be able to register more than one image for the same car
- [x] The user responsible for the registration of a image must be an administrator

---

# Car rental

**FR**

- [x] It should be possible to register a rental

**RN**

- [x] The rent must have a minimum duration of 24 hours
- [x] It should not be possible to register a new rent if there is already an open to the same user
- [x] It should not be possible to register a new rent if there is already an open to the same car
- [x] The user must be logged in the application
- [x] When performing a rent, the car status should be changed to unavailable

# Return of car

**FR**

- [x] It should be possible to return the car

**RN**

- [x] If the car is returned with less than 24 hours, it should be charged complete daily
- [x] When making the return, the car should be released to another rent
- [x] When making the return, the user must be released to another rent
- [x] When making the return, the total rental should be calculated
- [x] If the return time is higher than the expected delivery time, a fine proportional to the days of delay should be charged
- [x] If there is a fine, it should be added to the total rental
- [x] The user must be logged in the application

# User Rental Listing

**FR**

- [x] It should be possible to search for all rents to the user

**RN**

- [x] The user must be logged in the application

# Recover Password

**FR**

- [x] It should be possible for the user to recover the password informing the email
- [x] The user must receive an email with the step by step for password recovery
- [x] The user must be able to enter a new password

**RN**

- [x] The user needs to enter a new password
- [x] The link sent to recovery should expire in 3 hours
