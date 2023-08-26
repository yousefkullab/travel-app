# Travel App

his project aims to provide users with a custom travel app that allows them to input their desired trip location and date. The app retrieves and displays weather information and images for the specified location using data obtained from external APIs.

## Table of Contents

- [Travel App](#travel-app)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [API Keys](#api-keys)
  - [License](#license)

## Description

The travel app project is a full-stack web application built using HTML, CSS, JavaScript, Express, and Webpack. It interacts with Geonames, Weatherbit, and Pixabay APIs to provide location coordinates, weather data, and images.

## Features

- Capture user's desired trip location and date.
- Calculate the number of days left until the travel date using JavaScript.
- Fetch and display weather data (temperature, description) from the Weatherbit API.
- Retrieve and display an image of the location using the Pixabay API.
- Service worker implementation for offline access using service-worker.js.

## Technologies Used

- HTML5, CSS3 for front-end design.
- JavaScript for dynamic functionality.
- Express.js for setting up the server.
- Webpack for bundling assets.
- Fetch API for making HTTP requests.
- Geonames API for obtaining location coordinates.
- Weatherbit API for retrieving weather data.
- Pixabay API for fetching location images.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/travel-app.git`
2. Navigate to the project directory: `cd travel-app`
3. Install the project dependencies: `npm install`
4. Set up your API keys (see [API Keys](#api-keys)).
5. Build the dist folder:
    - For development mode (with source maps and development features): `npm run build-dev`
    - For production mode (optimized and minified code): `npm run build-prod`
6. Start the development server: `npm start`
7. Access the app in your web browser at [localhost:3000](http://localhost:3000)

## Usage

1. Enter the desired trip location and date in the form.
2. Click the "Show details" button.
3. The app will fetch and display weather data and an image of the location.

## API Keys

This project uses external APIs that require API keys. To set up the API keys:

1. Sign up for API keys from the following services:

   - [Geonames](http://www.geonames.org/export/web-services.html)
   - [WeatherBit](https://www.weatherbit.io/account/create)
   - [Pixabay](https://pixabay.com/api/docs/)

2. Create a .env file in the project root and add your API keys:
   - `username_geonames=your_geonames_username`
   - `api_key_weatherbit=your_weatherbit_api_key`
   - `api_key_pixabay=your_pixabay_api_key`

**Note:** Ensure that `.env` is added to your `.gitignore` to keep your API keys secure.

## License

© Yousef Kullab
