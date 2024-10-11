// nodejs-server/server.js
const express = require("express");
const http = require("http");
const mqtt = require("mqtt");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// MQTT client setup
const mqttClient = mqtt.connect("broker.hivemq.com", {
  port: 8883,
});

mqttClient.on("connect", () => {
  console.log("Connected to HiveMQ broker");
  mqttClient.subscribe("data_topic", (err) => {
    if (err) {
      console.error("Subscription error:", err);
    }
  });
});

mqttClient.on("message", (topic, message) => {
  // Handle incoming MQTT messages
  const data = JSON.parse(message.toString());
  console.log("Received data:", data);

  // Broadcast data to all clients using WebSocket
  io.emit("data", data);
});

// Basic route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
