// client.ts

import { StandardWebSocketClient  } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

function testWebSocketServer() {
  const ws = new StandardWebSocketClient("ws://localhost:8081/ws");

  ws.on("open", function() {
    console.log("WebSocket connection established");
    
    // Send a message to the server
    ws.send("Hello, WebSocket Server!");
  });

  ws.on("message", function(message: string) {
    console.log("Received message from server:", message);
  });

  ws.on("close", function() {
    console.log("WebSocket connection closed");
  });

  ws.on("error", function(error: Error) {
    console.error("WebSocket error:", error);
  });
}

// Run the test
testWebSocketServer();

// Keep the script running
setTimeout(() => {}, 1000 * 60 * 60); // Run for 1 hour
