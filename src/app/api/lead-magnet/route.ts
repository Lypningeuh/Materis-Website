import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import type { EmailTemplateSettings } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Default template settings
const DEFAULT_TEMPLATE: EmailTemplateSettings = {
  subject: "{prenom}, voici vos 3 techniques !",
  intro_text: "Merci pour votre confiance. Comme promis, voici **3 techniques** que j'utilise quotidiennement avec mes patientes.",
  main_text: "Ces techniques sont simples, efficaces, et vos patientes vont adorer !",
  button_text: "Accéder aux 3 techniques",
  button_url: "https://materis.fr/ressources/3-techniques",
  features: [
    "Vidéo explicative pas à pas",
    "PDF récapitulatif téléchargeable",
    "Conseils d'application clinique"
  ],
  closing_text: "Si vous avez la moindre question, n'hésitez pas à me répondre directement à cet email.",
  signature_name: "Sandrine"
};

// Fetch template settings from database
async function getTemplateSettings(): Promise<EmailTemplateSettings> {
  const { data } = await supabase
    .from("site_settings")
    .select("key, value")
    .like("key", "email_template_%");

  if (!data || data.length === 0) {
    return DEFAULT_TEMPLATE;
  }

  const settings: Record<string, string> = {};
  data.forEach((item: { key: string; value: string }) => {
    settings[item.key.replace("email_template_", "")] = item.value;
  });

  return {
    subject: settings.subject || DEFAULT_TEMPLATE.subject,
    intro_text: settings.intro_text || DEFAULT_TEMPLATE.intro_text,
    main_text: settings.main_text || DEFAULT_TEMPLATE.main_text,
    button_text: settings.button_text || DEFAULT_TEMPLATE.button_text,
    button_url: settings.button_url || DEFAULT_TEMPLATE.button_url,
    features: settings.features ? JSON.parse(settings.features) : DEFAULT_TEMPLATE.features,
    closing_text: settings.closing_text || DEFAULT_TEMPLATE.closing_text,
    signature_name: settings.signature_name || DEFAULT_TEMPLATE.signature_name,
  };
}

// Format text with markdown-like bold
function formatText(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #B8860B;">$1</strong>');
}

// Generate email HTML from template settings
function generateEmailHtml(prenom: string, template: EmailTemplateSettings): string {
  const featuresHtml = template.features
    .map(f => `<li>${f}</li>`)
    .join("\n                  ");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vos 3 techniques MATERIS</title>
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #FAF8F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: 400; color: #FFFFFF; letter-spacing: 4px;">MATERIS</span>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 40px 30px;">
              <h1 style="color: #1A1A1A; font-size: 28px; margin: 0 0 20px 0; font-weight: normal;">
                Bonjour ${prenom} !
              </h1>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                ${formatText(template.intro_text)}
              </p>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
                ${formatText(template.main_text)}
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 auto 30px auto;">
                <tr>
                  <td style="background: linear-gradient(135deg, #B8860B, #DAA520); border-radius: 50px; text-align: center;">
                    <a href="${template.button_url}"
                       style="display: inline-block; padding: 16px 32px; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 500;">
                      ${template.button_text}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- What's included -->
              <div style="background-color: #FAF8F5; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                <p style="color: #1A1A1A; font-size: 14px; font-weight: 600; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">
                  Ce qui vous attend :
                </p>
                <ul style="color: #4A4A4A; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  ${featuresHtml}
                </ul>
              </div>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 10px 0;">
                ${formatText(template.closing_text)}
              </p>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0;">
                À très vite,<br/>
                <strong style="color: #B8860B;">${template.signature_name}</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="color: #FFFFFF; opacity: 0.7; font-size: 14px; margin: 0 0 10px 0;">
                MATERIS - Formation en ostéopathie gynécologique
              </p>
              <p style="color: #FFFFFF; opacity: 0.5; font-size: 12px; margin: 0;">
                Toulouse & environs | sandrine.mosse@materis.fr
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function POST(request: Request) {
  try {
    const { prenom, email, telephone } = await request.json();

    // Validate required fields
    if (!prenom || !email) {
      return NextResponse.json(
        { error: "Prénom et email requis" },
        { status: 400 }
      );
    }

    // 1. Insert into Supabase
    const { data, error } = await supabase
      .from("lead_submissions")
      .insert({
        prenom,
        email,
        telephone: telephone || null,
        email_sent: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement" },
        { status: 500 }
      );
    }

    // 2. Get template settings
    const template = await getTemplateSettings();

    // 3. Send email via Resend
    const subject = template.subject.replace("{prenom}", prenom);
    const { error: emailError } = await resend.emails.send({
      from: "Sandrine MATERIS <onboarding@resend.dev>",
      to: email,
      subject,
      html: generateEmailHtml(prenom, template),
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      // Still return success since lead was saved
      return NextResponse.json({
        success: true,
        emailSent: false,
        message: "Lead enregistré mais email non envoyé"
      });
    }

    // 4. Update email_sent status
    await supabase
      .from("lead_submissions")
      .update({ email_sent: true })
      .eq("id", data.id);

    return NextResponse.json({ success: true, emailSent: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
