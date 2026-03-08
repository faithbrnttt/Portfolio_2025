const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/contact", async (req, res) => {
    try {
        const { name, email, subject, message, company } = req.body;

        if (company) {
            return res.status(200).json({ message: "Message received." });
        }

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email, and message are required.",
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.CONTACT_EMAIL,
                pass: process.env.CONTACT_EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.CONTACT_EMAIL,
            to: process.env.CONTACT_EMAIL,
            replyTo: email,
            subject: subject ? `Portfolio Contact: ${subject}` : "Portfolio Contact Form",
            text: `Name: ${name}
Email: ${email}
Subject: ${subject || "N/A"}

Message:
${message}`,
        });

        res.status(200).json({ message: "Message sent successfully." });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Server error while sending message." });
    }
});

module.exports = router;