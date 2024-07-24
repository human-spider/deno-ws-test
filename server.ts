import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/ws", async (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(400, "Unable to upgrade to WebSocket connection");
  }

  const ws = await ctx.upgrade();
  console.log("WebSocket connection established");

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  }

  ws.onmessage = (event) => {
    console.log("Received message from client:", event.data);
    ws.send("Hello, WebSocket Client!");
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = Deno.args[0] || "80";
console.log(`WebSocket server is running on port ${port}`);
await app.listen({ port });
