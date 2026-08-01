export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const { name, email, company, brief } = body;

    // Optional validation
    if (!name || !email || !brief) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const BREVO_API_KEY = env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is not configured in Cloudflare Pages environments.");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Brevo API payload
    const payload = {
      sender: {
        name: "Invonics Website",
        email: "hello@invonicstechnologies.com",
      },
      replyTo: {
        name: name,
        email: email,
      },
      to: [
        {
          email: "hello@invonicstechnologies.com",
          name: "Invonics Inquiries",
        },
      ],
      subject: `New Project Inquiry from ${name} ${company ? "(" + company + ")" : ""}`,
      htmlContent: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <br />
        <p><strong>Brief:</strong></p>
        <p>${brief}</p>
      `,
    };

    // Send request to Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: "Failed to send email", details: errorText }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
