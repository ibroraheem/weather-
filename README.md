# Weather App

The Weather App is a web application that allows users to check the weather forecast for a specific city. It uses the OpenWeatherMap API to fetch weather data.

## Prerequisites

Before running the Weather App locally, make sure you have the following installed on your computer:

- Node.js: You can download and install Node.js from the official website at [nodejs.org](https://nodejs.org/).

## Getting Started

1. **Clone the Repository**: Start by cloning this repository to your local machine. You can use the following command in your terminal:

   ```bash
   git clone <repository-url>
   ```

   Replace `<repository-url>` with the actual URL of the repository.

2. **Navigate to the Project Directory**: Change your working directory to the project folder by using the `cd` command. For example:

   ```bash
   cd weather-app
   ```

3. **Install Dependencies**: Once you're inside the project directory, install the required dependencies using npm. Run the following command:

   ```bash
   npm install
   ```

   This will download and install the necessary packages specified in the `package.json` file.

4. **Get an API Key**: You'll need an API key from OpenWeatherMap to make API calls. You can obtain a free API key by signing up on the OpenWeatherMap website.

5. **Set Your API Key**: Open the project in a code editor and locate the `API_KEY` variable in the `Weather.tsx` file. Replace `'YOUR_API_KEY'` with your actual OpenWeatherMap API key.

6. **Run the App**: After setting your API key, you can run the Weather App using the following command:

   ```bash
   npm start
   ```

   This command will start a development server and open the Weather App in your default web browser.

7. **Use the App**: You can now use the Weather App to check the weather forecast for a city. Enter a city name in the search bar and click the "Search" button. The app will fetch and display the weather information for the specified city.

8. **Get User Location (Optional)**: The app can also use your browser's geolocation feature to automatically determine your location and display the weather for your current city. If you allow location access when prompted, the app will use your current location as the default.

9. **Enjoy the Weather**: You can enjoy using the Weather App to check the weather forecast for various cities or your current location.

## Troubleshooting

- If you encounter any issues or errors while running the app, make sure you've followed the installation steps correctly, and check your API key.

- If you encounter any geolocation-related issues, ensure that your browser has permission to access your location.

## License

This Weather App is released under the [MIT License](LICENSE).

Happy weather checking!
