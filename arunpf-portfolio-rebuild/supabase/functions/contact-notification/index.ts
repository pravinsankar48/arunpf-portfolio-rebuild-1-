import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function getAllowedOrigins() {
  return (Deno.env.get("ALLOWED_ORIGINS") || "https://arunpf.com,https://www.arunpf.com,http://localhost:5173")
    .split(",").map((value) => value.trim()).filter(Boolean);
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") || "";
  const allowedOrigins = getAllowedOrigins();
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : "";
  const corsHeaders = {
    ...(allowedOrigin ? { "Access-Control-Allow-Origin": allowedOrigin, "Vary": "Origin" } : {}),
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

  if (req.method === "OPTIONS") {
    if (!allowedOrigin) return new Response("Origin not allowed", { status: 403 });
    return new Response("ok", { headers: corsHeaders });
  }
  if (!allowedOrigin) return response({ ok: false, error: "Origin not allowed" }, 403);
  if (req.method !== "POST") return response({ ok: false, error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const project_type = String(body.project_type ?? "").trim().slice(0, 120);
    const message = String(body.message ?? "").trim();

    if (body.company) return response({ ok: true, emailSent: false });
    if (name.length < 1 || name.length > 100) return response({ ok: false, error: "Invalid name" }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return response({ ok: false, error: "Invalid email" }, 400);
    if (message.length < 10 || message.length > 5000) return response({ ok: false, error: "Message must be 10–5000 characters" }, 400);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmail = Deno.env.get("CONTACT_NOTIFICATION_EMAIL");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");
    if (!supabaseUrl || !serviceRoleKey) return response({ ok: false, error: "Server database configuration is missing" }, 500);

    const admin = createClient(supabaseUrl, serviceRoleKey);
    const { error: insertError } = await admin.from("contact_messages").insert({ name, email, project_type, message });
    if (insertError) {
      console.error("Database insert failed:", insertError.message);
      return response({ ok: false, error: "Could not save message" }, 500);
    }

    if (!resendApiKey || !notifyEmail || !fromEmail) {
      console.error("Email notification secrets are not configured");
      return response({ ok: true, emailSent: false });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyEmail],
        reply_to: email,
        subject: `Portfolio enquiry: ${name}`,
        text: `New portfolio enquiry\n\nName: ${name}\nEmail: ${email}\nProject type: ${project_type || "Not specified"}\n\nMessage:\n${message}`,
      }),
    });
    if (!emailResponse.ok) {
      console.error("Resend request failed:", await emailResponse.text());
      return response({ ok: true, emailSent: false });
    }
    return response({ ok: true, emailSent: true });
  } catch (error) {
    console.error("Contact function error:", error);
    return response({ ok: false, error: "Unexpected server error" }, 500);
  }
});
