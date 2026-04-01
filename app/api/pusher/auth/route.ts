import { NextResponse } from "next/server";
import Pusher from "pusher";

export const dynamic = "force-dynamic";

const appId = process.env.PUSHER_APP_ID;
const key = process.env.PUSHER_KEY;
const secret = process.env.PUSHER_SECRET;
const cluster = process.env.PUSHER_CLUSTER;

if (!appId || !key || !secret || !cluster) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("Pusher auth route: missing server env vars.");
  }
}

const pusher = new Pusher({
  appId: appId || "",
  key: key || "",
  secret: secret || "",
  cluster: cluster || "",
  useTLS: true,
});

export async function POST(request: Request) {
  let socket_id: string | null = null;
  let channel_name: string | null = null;

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    socket_id = body?.socket_id || null;
    channel_name = body?.channel_name || null;
  } else {
    const form = await request.formData();
    socket_id = (form.get("socket_id") as string) || null;
    channel_name = (form.get("channel_name") as string) || null;
  }

  if (!socket_id || !channel_name) {
    return NextResponse.json(
      { error: "Missing socket_id or channel_name" },
      { status: 400 }
    );
  }

  const user_id = crypto.randomUUID();
  const auth = pusher.authenticate(socket_id, channel_name, { user_id });

  return NextResponse.json(auth);
}
