const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.get("/weather/:city", async (req, res) => {

    const city = req.params.city;

    console.log("API KEY:", process.env.API_KEY);

    try {

        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: city,
                    appid: process.env.API_KEY,
                    units: "metric"
                }
            }
        );

        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            weather: response.data.weather[0].description
        });

    } catch (error) {

        console.log("FULL ERROR:");

        if (error.response) {
            console.log(error.response.data);

            res.status(500).json(error.response.data);

        } else {
            console.log(error.message);

            res.status(500).json({
                error: error.message
            });
        }
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});