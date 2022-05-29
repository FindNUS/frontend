# FindNUS Frontend (Orbital 2022)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Ffindnus.netlify.app%2F)


## Overview

[![FindNUS Homepage](https://i.imgur.com/gaKicrb.png)](https://findnus.netlify.app)

### [Demo](https://findnus.netlify.app)

FindNUS is a lost and found item management system which aims to supplement existing NUS lost and found system in National University of Singapore (NUS) by reducing the barriers for item finders to submit an item online. As such, item losters are more likely to find an item which they have lost on top of items which only make it to the security personnel.


## Getting Started

A demo of this application can be accessed at https://findnus.netlify.app

__Installation__ 

```shell
git clone https://github.com/FindNUS/frontend.git
cd frontend
npm install
```

__Configure app__

- Make a copy of [.env.example](.env.example) and rename it as `.env`
- Configure the project in the `.env` file by setting the parameters corresponding to your firebase project, and the path to API

  _Note: The backend setup must be linked to the same firebase project_ 

__Launch the app__

- Run `npm start` to initialise the local server


## Features

- Search for items via keyword
- Authenticate users via phone number

## Frontend Timeline

### Milestone 1

- SMS login
- App routing  
- Protected routing
- API call for item search (Keywords: Water bottle, Laptop, Mouse, Matric card, CS1231 Notes, Airpods, Lanyard with card)

__Remarks__

- Non-functional components: Filter, found item submission
- Known problems: On login page, <kbd>Enter</kbd> only works for getting OTP. Pressing <kbd>Enter</kbd> to verify OTP will cause page refresh.


## App Directory

| Route         | Page                        | Remarks                                                    |
| ------------- | --------------------------- | ---------------------------------------------------------- |
| `/`           | Main page                   |                                                            |
| `/login`      | User authentication         |                                                            |
| `/dashboard`  | User profile                | Protected route, user must be authenticated to access page |
| `/components` | Overview of components used | For development use                                        |
