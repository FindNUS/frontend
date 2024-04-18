<!-- omit in toc -->
# FindNUS Frontend (Orbital 2022)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Ffindnus.netlify.app%2F)
![GitHub issues](https://img.shields.io/github/issues/FindNUS/frontend)

[![FindNUS Homepage](https://i.imgur.com/m2e5jDX.png)](https://findnus.netlify.app)

[[Demo](https://findnus.netlify.app)]

FindNUS is a lost and found item management system which aims to supplement existing NUS lost and found system in National University of Singapore (NUS) by reducing the barriers for item finders to submit an item online. As such, item losters are more likely to find an item which they have lost on top of items which only make it to the security personnel. The frontend is built using React 17 and TypeScript, with emphasis on Redux for state management. Sass is also used as the CSS-preprocessor for easier management of styling.

<div align="right"><a href="#table-of-contents">Back to top</a></div>

<!-- omit in toc -->
## Table of Contents
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Setting up API keys on Google Cloud console](#setting-up-api-keys-on-google-cloud-console)
    - [Setting up Firebase CLI](#setting-up-firebase-cli)
    - [Setting up the .env file](#setting-up-the-env-file)
  - [Launch the app](#launch-the-app)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Frontend Timeline](#frontend-timeline)
  - [Milestone 1: Ideation](#milestone-1-ideation)
  - [Milestone 2: Prototype](#milestone-2-prototype)
  - [Milestone 3: Extensions](#milestone-3-extensions)
- [File Structure](#file-structure)
- [Recommended browsers](#recommended-browsers)
- [Known Issues](#known-issues)
  - [1. React \>=18](#1-react-18)
  - [2. Upgrading Firebase `>10.6.0`](#2-upgrading-firebase-1060)
  - [3. Firebase permissions](#3-firebase-permissions)

## Getting Started

A demo of this application can be accessed at https://findnus.netlify.app

The demo backend is available at https://findnus.herokuapp.com

For more information and documentation, please visit https://findnus.github.io/

### Installation

```shell
git clone https://github.com/FindNUS/frontend.git
cd frontend
npm install
```
### Configuration
#### Setting up API keys on Google Cloud console

There are two environment variables required for the Google Maps API integration. You will need to set the following configurations in the Google Cloud console under "APIs & Services" > "Credentials"

| Variable Name                | API Restrictions                         | Application Restrictions   | Website Restrictions                  |
| ---------------------------- | ---------------------------------------- | -------------------------- | ------------------------------------- |
| REACT_APP_MAPS_EMBED_KEY     | Maps Embed API                           | HTTP referrers (web sites) | example.com/* <br /> example.com/\*/* |
| REACT_APP_MAPS_GEOCODING_KEY | Geocoding API <br /> Maps JavaScript API | Same as above              | Same as above                         |

_Note: It is possible to skip this step and use one API key for both environment variables with no application/website restrictions during development. However we __do not__ recommend this to be done in production to prevent unauthorised use of your API key, as it is accessible by the user (Click [here](https://cloud.google.com/docs/authentication/api-keys) for more information)._

#### Setting up Firebase CLI

An authentication token is required for running tests on the Emulator Suite. You may generate the token with the following command:

```shell
firebase login:ci
```

Upon logging in to your Google account, you will be provided with an _access token_ in the command line. Store this key as `FIREBASE_TOKEN`.

#### Setting up the .env file

- Make a copy of [.env.example](.env.example) and rename it as `.env`
- Configure the project in the `.env` file by setting the parameters corresponding to your firebase project, the path to API, and the parameters as described above
- Depending on your application environment, `REACT_APP_DEPLOY_ENV` should be set accordingly to `production`, `development` or `test`.

  _Note: The backend setup must be linked to the same firebase project_ 

### Launch the app

- Run `npm start` to initialise the local server

<div align="right"><a href="#table-of-contents">Back to top</a></div>

## Documentation

The documentation for FindNUS is available [here](https://findnus.github.io/).

<div align="right"><a href="#table-of-contents">Back to top</a></div>

## Tech Stack


<div>
    <div>
        <img 
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' 
            title="React"
            alt="React"
            width="80"
        >
        <img 
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' 
            title="TypeScript"
            alt="TypeScript"
            width="80"
        >
        <img 
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' 
            title="Sass"
            alt="Sass"
            width="80"
        >
        <img 
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' 
            title="Redux"
            alt="Redux"
            width="80"
        >
        <img 
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' 
            title="Firebase"
            alt="Firebase"
            width="80"
        >
    </div>
    <div>
        <img 
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' 
            title="Google Cloud"
            alt="Google Cloud"
            width="80"
        >
        <img 
            src='https://symbols.getvecta.com/stencil_25/40_jest.5fde12ec22.svg' 
            title="Jest"    
            alt="Jest"    
            width="80"
        >
        <img 
            src='https://testing-library.com/img/logo-large.png' 
            title="React Testing Library"
            alt="React Testing Library"
            width="80"
        >
        <img 
            src='https://avatars.githubusercontent.com/u/44036562?s=280&v=4' 
            title="GitHub Actions"
            alt="GitHub Actions"
            width="80"
        >
    </div>
</div>

<div align="right"><a href="#table-of-contents">Back to top</a></div>

## Frontend Timeline
### Milestone 1: Ideation

- SMS login
- App routing  
- Protected routing
- API call for item search (Keywords: Water bottle, Laptop, Mouse, Matric card, CS1231 Notes, Airpods, Lanyard with card)

### Milestone 2: Prototype

__New features:__

- Item search by keywords or location
- Item peeking on home page (view recently submitted items by descending date)
- Item filtering by category for both search and peek
- User dashboard: View user-uploaded (lost) items, profile
- Item submission logic (both found and lost items): Drag and drop to upload image, dropdown menu to select various fields
- Form field validation for item

### Milestone 3: Extensions

 __New features:__
  
- Geocoding
  - Show addresses matching location query when submitting item
  - Display map after selecting location
  - Display map when viewing items with [plus code](https://maps.google.com/pluscodes/)
- Item viewing
  - Pagination for item peeking on home page
  - Allow users to select number of items to display per page
  - Allow users to filter items by date
- First Time Users
  - Users are can input their name and email address upon login (optional) 
- Lookout
  - Users can now subscribe to email notifications for possible item matches (Email verification required)
  
__Improvements to UX:__

- Responsive page design for use with mobile and tablet devices
  - Hamburger menu for navigation on smaller devices
  - Media queries for various pages
- Show matching items for lost items (Using Natural-Language Processing as explained in FindNUS/backend#151)
- Allow users to input 8-digit phone numbers starting with 8 or 9 (Valid Singapore mobile number)
- Implement sticky item filter menu for non-mobile devices for ease of access to filters
- Hide overflowing text for preview items with long names and locations
- Improve image loading speed with Imgur thumbnails
- Allow photos to be removed when uploading or editing an item

<div align="right"><a href="#table-of-contents">Back to top</a></div>

## File Structure
You will find the following files in the cloned repository
```
.
├── README.md
├── firebase.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── app
│   │   ├── App.scss
│   │   ├── firebase.ts
│   │   ├── rootReducer.ts
│   │   └── store.ts
│   ├── assets
│   │   ├── dummy
│   │   │   └── search_query_example.json
│   │   ├── img
│   │   │   ├── Logo_White_Red.png
│   │   │   ├── background-large.jpg
│   │   │   └── background.jpg
│   │   └── sass
│   │       ├── abstracts
│   │       │   ├── _index.scss
│   │       │   ├── _mixins.scss
│   │       │   └── _variables.scss
│   │       ├── base
│   │       │   ├── _animations.scss
│   │       │   ├── _index.scss
│   │       │   ├── _reset.scss
│   │       │   └── _typography.scss
│   │       ├── components
│   │       │   ├── _backbtntext.scss
│   │       │   ├── _button.scss
│   │       │   ├── _card.scss
│   │       │   ├── _checkbox.scss
│   │       │   ├── _crudoptions.scss
│   │       │   ├── _dropdown.scss
│   │       │   ├── _fileupload.scss
│   │       │   ├── _formfield.scss
│   │       │   ├── _geocoding.scss
│   │       │   ├── _index.scss
│   │       │   ├── _itemcard.scss
│   │       │   ├── _link.scss
│   │       │   ├── _lnfitem.scss
│   │       │   ├── _loading.scss
│   │       │   ├── _logo.scss
│   │       │   ├── _noimage.scss
│   │       │   ├── _pagetitle.scss
│   │       │   ├── _popupmsg.scss
│   │       │   ├── _previewpagination.scss
│   │       │   ├── _search.scss
│   │       │   ├── _searchfilter.scss
│   │       │   └── _viewitem.scss
│   │       ├── layout
│   │       │   ├── _background.scss
│   │       │   ├── _dashboard.scss
│   │       │   ├── _header.scss
│   │       │   ├── _index.scss
│   │       │   └── _searchresults.scss
│   │       └── pages
│   │           ├── _home.scss
│   │           ├── _index.scss
│   │           ├── _login.scss
│   │           ├── _search.scss
│   │           ├── _submititem.scss
│   │           └── dashboard
│   │               ├── _dashboard.scss
│   │               ├── _dashboardbody.scss
│   │               ├── _dashboardnav.scss
│   │               └── _index.scss
│   ├── components
│   │   ├── Card.tsx
│   │   ├── Loading.tsx
│   │   ├── Logo.tsx
│   │   ├── NoImage.tsx
│   │   ├── PageTitle.tsx
│   │   ├── PopupMessage.tsx
│   │   ├── __tests__
│   │   │   ├── Card.test.tsx
│   │   │   ├── Loading.test.tsx
│   │   │   ├── Logo.test.tsx
│   │   │   ├── NoImage.test.tsx
│   │   │   ├── PageTitle.test.tsx
│   │   │   └── PopupMessage.test.tsx
│   │   ├── buttons
│   │   │   ├── BackButtonText.tsx
│   │   │   ├── BigButton.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── ButtonFound.tsx
│   │   │   ├── ButtonLink.tsx
│   │   │   ├── ButtonSearch.tsx
│   │   │   ├── ButtonSubmit.tsx
│   │   │   └── __tests__
│   │   │       ├── BackButtonText.test.tsx
│   │   │       ├── BigButton.test.tsx
│   │   │       ├── Button.test.tsx
│   │   │       ├── ButtonFound.test.tsx
│   │   │       ├── ButtonLink.test.tsx
│   │   │       ├── ButtonSearch.test.tsx
│   │   │       └── ButtonSubmit.test.tsx
│   │   ├── form
│   │   │   ├── Checkbox.tsx
│   │   │   ├── DropdownButton.tsx
│   │   │   ├── FormField.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── TextArea.tsx
│   │   │   └── __tests__
│   │   │       ├── Checkbox.test.tsx
│   │   │       ├── DropdownButton.test.tsx
│   │   │       ├── FormField.test.tsx
│   │   │       ├── FormInput.test.tsx
│   │   │       └── TextArea.test.tsx
│   │   └── header
│   │       ├── Header.tsx
│   │       ├── MenuButton.tsx
│   │       ├── NavItem.tsx
│   │       ├── NavList.tsx
│   │       └── __tests__
│   │           ├── Header.test.tsx
│   │           └── NavItem.test.tsx
│   ├── constants
│   │   ├── api.ts
│   │   ├── app.ts
│   │   ├── auth.ts
│   │   ├── firebase.ts
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   ├── search.ts
│   │   ├── submit_item.ts
│   │   └── view_item.ts
│   ├── features
│   │   ├── auth
│   │   │   ├── LoginForm.tsx
│   │   │   ├── VerifyEmail.tsx
│   │   │   ├── authSlice.ts
│   │   │   ├── first_time
│   │   │   │   └── FirstTimeUserForm.tsx
│   │   │   ├── get_otp
│   │   │   │   ├── GetOTPButton.tsx
│   │   │   │   ├── GetOTPForm.tsx
│   │   │   │   └── verifyPhoneNumber.ts
│   │   │   ├── loginSlice.ts
│   │   │   └── verify_otp
│   │   │       ├── VerifyOTPButton.tsx
│   │   │       └── VerifyOTPForm.tsx
│   │   ├── dashboard
│   │   │   ├── DashboardItems.tsx
│   │   │   ├── DashboardManage.tsx
│   │   │   ├── DashboardNav.tsx
│   │   │   └── DashboardProfile.tsx
│   │   ├── geocoding
│   │   │   ├── EmbeddedMap.tsx
│   │   │   └── GeocodingSearch.tsx
│   │   ├── item_submission
│   │   │   ├── ItemSubmissionForm.tsx
│   │   │   ├── ItemSubmissionPost.tsx
│   │   │   ├── ItemSubmissionType.tsx
│   │   │   ├── UploadDragDrop.tsx
│   │   │   ├── generateFormErrorStatus.ts
│   │   │   └── submitItemSlice.ts
│   │   ├── preview_items
│   │   │   ├── ItemCard.tsx
│   │   │   ├── PeekContainer.tsx
│   │   │   ├── PreviewFilter.tsx
│   │   │   ├── PreviewItems.tsx
│   │   │   ├── PreviewPagination.tsx
│   │   │   ├── __tests__
│   │   │   │   └── PreviewPagination.test.tsx
│   │   │   ├── getImgurThumbnailUrl.ts
│   │   │   └── previewItemsSlice.ts
│   │   ├── search
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchContainer.tsx
│   │   │   └── searchSlice.ts
│   │   └── view_item
│   │       ├── ItemCRUDOptions.tsx
│   │       ├── LostAndFoundItem.tsx
│   │       ├── ViewItem.tsx
│   │       └── viewItemSlice.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── reduxHooks.ts
│   │   ├── useAxios.ts
│   │   ├── useConvertFileToBase64.ts
│   │   ├── useEventListener.ts
│   │   ├── useFirebaseGetOTP.ts
│   │   ├── useFirebaseLogout.ts
│   │   ├── useFirebaseSendEmailVerification.ts
│   │   ├── useFirebaseVerifyOTP.ts
│   │   └── useIsomorphicLayoutEffect.ts
│   ├── index.tsx
│   ├── pages
│   │   ├── ComponentsView.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── SearchPage.tsx
│   │   ├── SubmitItemPage.tsx
│   │   └── ViewPage.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   └── utils
│       ├── __tests__
│       │   └── getDateInputValue.test.ts
│       ├── getArrayObjectKeyFromValue.ts
│       ├── getArrayObjectValueFromKey.ts
│       ├── getContactMethodValue.ts
│       ├── getDateInputValue.ts
│       ├── processItemResponseFromAPI.ts
│       └── processSubmitItemForAPI.ts
└── tsconfig.json
```

<div align="right"><a href="#table-of-contents">Back to top</a></div>

## Recommended browsers

We recommend using the latest versions of Google Chrome and Chromium-based browsers.

| Browser                       | Version                                  |
| ----------------------------- | ---------------------------------------- |
| Google Chrome <br /> Chromium | 103.0.5060.134 (Official Build) (64-bit) |
| Firefox                       | 102.0.1 (64-bit)                         |
| Brave                         | 1.41.100                                 |

<div align="right"><a href="#table-of-contents">Back to top</a></div>


## Known Issues

### 1. React >=18

`react-redux-firebase` supports up to React `17`, and is currently out of development. As such, it is not possible to upgrade React beyond version 17, as well as various depencencies including `react-toastify` and `react-drag-drop-files` without making significant changes to the application. There are no plans to migrate to another library.

### 2. Upgrading Firebase `>10.6.0`

```
ReferenceError: TextDecoder is not defined
```

The testing environment does not support `TextDecoder`, which is used by `undici` in `firebase` (see [github issue](https://github.com/firebase/firebase-js-sdk/issues/7845))

Possible to add polyfills to resolve this issue, but will not be fixed as it is not a pressing issue.

### 3. Firebase permissions

```
ERROR
Missing or insufficient permissions.
FirebaseError: Missing or insufficient permissions.
```

Unknown source.