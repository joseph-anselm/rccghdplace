// app/api/form-token/route.js — issues a short-lived signed token for public forms

import { NextResponse } from "next/server";
import { issueFormToken } from "@/lib/spam-guard";

const ALLOWED_FORMS = new Set(["testimony", "counsel"]);

export const dynamic = "force-dynamic";

export async function GET(req) {
  const form = new URL(req.url).searchParams.get("form") || "";
  if (!ALLOWED_FORMS.has(form)) {
    return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  }
  try {
    return NextResponse.json(
      { token: issueFormToken(form) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[form-token]", err.message);
    return NextResponse.json(
      {
        error: "Form unavailable.",
        // Only shown while developing locally, never in production
        ...(process.env.NODE_ENV !== "production" && { detail: err.message }),
      },
      { status: 500 }
    );
  }
}