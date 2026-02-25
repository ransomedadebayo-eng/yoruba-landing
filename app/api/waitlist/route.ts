import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, email, language, persona, level, budget, painPoint } = body;

    // Basic validation
    if (!firstName || !email || !language || !persona || !level || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // If Supabase is configured, store the submission
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("waitlist").insert([
        {
          first_name: firstName,
          email: email.toLowerCase().trim(),
          language,
          persona,
          level,
          budget,
          pain_point: painPoint || null,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        // Duplicate email — handle gracefully
        if (error.code === "23505") {
          return NextResponse.json(
            { error: "This email is already on the waitlist." },
            { status: 409 }
          );
        }
        console.error("Supabase error:", error);
        return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
      }
    } else {
      // No DB configured — log for demo purposes
      console.log("📋 Waitlist submission (no DB configured):", {
        firstName,
        email,
        language,
        persona,
        level,
        budget,
        painPoint,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
