// app/api/comments/route.js

import { NextResponse } from "next/server";
import { client } from "@/sanityClient";

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_COMMENT = 1000;
const MAX_NAME = 80;

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("SANITY_API_WRITE_TOKEN is not set");
    return NextResponse.json({ error: "Comments are temporarily unavailable." }, { status: 500 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend it worked, save nothing.
  if (body.website) {
    return NextResponse.json({
      comment: { _id: `hp-${Date.now()}`, name: "Anonymous", comment: "", _createdAt: new Date().toISOString() },
    });
  }

  const postId = clean(body.postId, 100);
  const comment = clean(body.comment, MAX_COMMENT);
  const anonymous = Boolean(body.anonymous);
  const name = anonymous ? "Anonymous" : clean(body.name, MAX_NAME);
  const email = anonymous ? null : clean(body.email, 200);

  if (!postId || !/^[\w.-]+$/.test(postId)) {
    return NextResponse.json({ error: "Invalid post." }, { status: 400 });
  }
  if (!comment) {
    return NextResponse.json({ error: "Please write a comment." }, { status: 400 });
  }
  if (!anonymous && (!name || !EMAIL_RE.test(email || ""))) {
    return NextResponse.json({ error: "Please enter your name and a valid email." }, { status: 400 });
  }

  try {
    // Make sure the post exists before attaching a comment to it
    const exists = await writeClient.fetch(`defined(*[_type == "blog" && _id == $id][0]._id)`, { id: postId });
    if (!exists) {
      return NextResponse.json({ error: "This post no longer exists." }, { status: 404 });
    }

    const doc = await writeClient.create({
      _type: "comment",
      post: { _type: "reference", _ref: postId },
      name,
      email,
      comment,
    });

    // Email is stored for the church team only — never sent back to the browser
    return NextResponse.json({
      comment: { _id: doc._id, name: doc.name, comment: doc.comment, _createdAt: doc._createdAt },
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json({ error: "Could not post your comment. Please try again." }, { status: 500 });
  }
}
