# Dashboard App

A React project that allows users to access a Dashboard to manage customers. Users may also export customer information into .csv files.

[Hosted on Netlify](https://gwdashboards.netlify.app/) - Please wait up to 30 seconds for the Netlify server to start up after clicking the link.

## Running the App Locally

Clone the app onto your local machine and navigate to the directory.

First install the dependencies with `npm install`.

Once that is complete, create a copy of `.env.example` and rename it to `.env` so that the app can fetch data from the API server.

To start the app, type `npm start` into your terminal to open the app in development mode on [http://localhost:3000](http://localhost:3000) in your browser. If you receive an error saying that the port is already being used, press `y` to automatically run it on a different port.

## Testing

Jest tests can be run with `npm test`.

Cypress tests can be run with `npm run cypress open -P .` and then clicking on the `navigation.spec.js` option which will open up a browser. If the app did not open on port 3000, open `cypress.json` and change the localhost number from 3000 to the port the app is running on.

## Screenshots

Home page
<br>
!['Home'](https://github.com/gwan93/dashboard/blob/master/docs/Home.png?raw=true)
<br>
<br>


User login page
<br>
!['Login'](https://github.com/gwan93/dashboard/blob/master/docs/Login.png?raw=true)
<br>
<br>


Dashboard page
<br>
!['Dashboard'](https://github.com/gwan93/dashboard/blob/master/docs/Dashboard.png?raw=true)