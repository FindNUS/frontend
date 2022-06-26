# FindNUS Frontend (Orbital 2022)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Ffindnus.netlify.app%2F)


## Overview

[![FindNUS Homepage](https://i.imgur.com/gaKicrb.png)](https://findnus.netlify.app)

### [[Demo](https://findnus.netlify.app)] [[Docs](https://findnus.github.io/)]

FindNUS is a lost and found item management system which aims to supplement existing NUS lost and found system in National University of Singapore (NUS) by reducing the barriers for item finders to submit an item online. As such, item losters are more likely to find an item which they have lost on top of items which only make it to the security personnel.


## Getting Started

A demo of this application can be accessed at https://findnus.netlify.app

The demo backend is available at https://findnus.herokuapp.com

For more information and documentation, please visit https://findnus.github.io/

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

### Milestone 2

__New features:__

- Item search by keywords or location
- Item peeking on home page (view recently submitted items by descending date)
- Item filtering by category for both search and peek
- User dashboard: View user-uploaded (lost) items, profile
- Item submission logic (both found and lost items): Drag and drop to upload image, dropdown menu to select various fields
- Form field validation for item

__Existing features:__

- SMS login
- App routing
- Protected routing

__Remarks:__

- Known issues with form field date validation (Invalid date error on item submit at 12am)

## App Directory

| Route                | Page                                 | Remarks                                   |
| -------------------- | ------------------------------------ | ----------------------------------------- |
| `/`                  | Main page                            |                                           |
| `/submit-item/type`  | Select submit item type              | Submit either lost or found item          |
| `/submit-item/form`  | Form to submit item                  | Query `type=lost` requires authentication |
| `/view`              | View detailed information about item | Redirects from home, search and dashboard |
| `/login`             | User authentication                  |                                           |
| `/dashboard/profile` | User profile                         | Requires authentication                   |
| `/dashboard/items`   | User-uploaded items                  | Requires authentication                   |
| `/components`        | Overview of components used          | For development use                       |
