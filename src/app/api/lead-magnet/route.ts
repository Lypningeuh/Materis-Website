import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Email template HTML
const getEmailTemplate = (prenom: string) => `
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
              <img src="https://materis.fr/logo_white.svg" alt="MATERIS" style="height: 50px; width: auto;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 40px 30px;">
              <h1 style="color: #1A1A1A; font-size: 28px; margin: 0 0 20px 0; font-weight: normal;">
                Bonjour ${prenom} !
              </h1>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                Merci pour votre confiance. Comme promis, voici <strong style="color: #B8860B;">3 techniques</strong> que j'utilise quotidiennement avec mes patientes.
              </p>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
                Ces techniques sont simples, efficaces, et vos patientes vont adorer !
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 auto 30px auto;">
                <tr>
                  <td style="background: linear-gradient(135deg, #B8860B, #DAA520); border-radius: 50px; text-align: center;">
                    <a href="https://materis.fr/ressources/3-techniques"
                       style="display: inline-block; padding: 16px 32px; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 500;">
                      Accéder aux 3 techniques
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
                  <li>Vidéo explicative pas à pas</li>
                  <li>PDF récapitulatif téléchargeable</li>
                  <li>Conseils d'application clinique</li>
                </ul>
              </div>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 10px 0;">
                Si vous avez la moindre question, n'hésitez pas à me répondre directement à cet email.
              </p>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0;">
                À très vite,<br/>
                <strong style="color: #B8860B;">Sandrine</strong>
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

    // 2. Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: "Sandrine MATERIS <onboarding@resend.dev>",
      to: email,
      subject: `${prenom}, voici vos 3 techniques !`,
      html: getEmailTemplate(prenom),
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

    // 3. Update email_sent status
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
