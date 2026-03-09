const express = require("express");
const { Resend } = require("resend");

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const { data, error } = await resend.emails.send({
            from: process.env.CONTACT_FROM || "onboarding@resend.dev",
            to: [process.env.CONTACT_EMAIL],
            reply_to: email,
            subject: `Portfolio Contact Form - ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        });

        if (error) {
            console.error("Resend error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to send message"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (err) {
        console.error("Contact form error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
});

module.exports = router;