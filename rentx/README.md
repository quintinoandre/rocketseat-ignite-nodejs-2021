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

- [ ] It should be possible to register a rental

**RN**

- [ ] The rent must have a minimum duration of 24 hours
- [ ] It should not be possible to register a new rent if there is already an open to the same user
- [ ] It should not be possible to register a new rent if there is already an open to the same car
