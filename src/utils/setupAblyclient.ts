import * as Ably from "ably";

async function setupAblyClient() {
  console.log("Setting up Ably client");

  const clientId: string = `ably-client-${Math.random().toString(36).slice(2, 11)}`;

  // Initialize the Ably Realtime client with Basic Authentication
  // Yeah, don't do this in production but it's a hackaton so ¯\_(ツ)_/¯'
  const ably = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId: clientId,
  });

  // Get the 'comments' channel (replace with the actual channel name)
  const channel = ably.channels.get("comments");

  return { ably, channel };
}

export default setupAblyClient;
