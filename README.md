# 🌦️ Weather App

A sleek and responsive React-based Weather App that allows users to search for real-time weather information by city. It features dynamic greetings, recent search history, and local time of searched locations, enhancing the user experience.

## 🚀 Features

* 🔍 **City Search**: Fetches real-time weather data using OpenWeatherMap API.
* 🥰 **Local Time**: Displays the local time of the searched city.
* 👋 **Dynamic Greeting**: Adjusts greeting message, icon, and background based on time of day.
* 📜 **Recent Searches**: Stores last 5 searched cities using `localStorage`.
* 🌐 **Weather Icons**: Context-aware icons for different weather conditions.
* 💬 **Error Handling**: Displays error messages for invalid or failed searches.
* ⏳ **Loading State**: Visual feedback while fetching data.

## 📦 Tech Stack

* React (Vite)
* JavaScript (ES6+)
* OpenWeatherMap API
* CSS (custom styling)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```
   VITE_APP_ID=your_openweathermap_api_key
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── assets/               # Weather icons
├── components/
│   └── Weather.jsx       # Main Weather component
├── App.jsx
├── main.jsx
└── Weather.css           # Component-specific styles
```

## 🔑 API Reference

* [OpenWeatherMap Current Weather API](https://openweathermap.org/current)
* Ensure you use the metric system (`units=metric`) for Celsius temperature display.

## 🤩 Possible Improvements

* 🌍 Add map integration with city marker.
* 🗕️ Show 5-day weather forecast.
* 🌙 Add light/dark mode toggle.
* 🗌 Support geolocation (user’s current weather).

## 📄 License

This project is licensed under the MIT License.
