import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_BASE = import.meta.env.VITE_API_URL || "";
const CONTACT_ENDPOINT = `${API_BASE}/api/contact`;

const INITIAL_FORM = {
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
};

export default function FaithbDevContactSection() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatus({ type: "error", message: "Please fill out all required fields." });
            return;
        }

        try {
            setLoading(true);
            
            const res = await fetch(CONTACT_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Something went wrong.");
            }

            setStatus({ type: "success", message: "Message sent successfully." });
            setForm(INITIAL_FORM);
        } catch (error) {
            setStatus({ type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">

                <div className="contact-form-card">
                    <h2 className="contact-title">Let's Work Together</h2>
                    <p className="contact-subtitle">
                        Interested in collaborating or hiring? Send me a message.
                    </p>

                    <form onSubmit={handleSubmit} className="contact-form">

                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            className="hidden-field"
                        />

                        <div className="form-row">
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>

                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                        />

                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            rows="6"
                            required
                        />

                        {status.message && (
                            <div className={`form-status ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button className="contact-submit-btn" type="submit" disabled={loading}>
                            <strong>{loading ? "Sending..." : "Send Message"}</strong>
                        </button>

                    </form>
                </div>

                <div className="contact-links">
                    <div className="abstract">
                        <hr className="hrone"></hr>
                        <hr className="hrtwo"></hr>
                        <hr className="hrthree"></hr>
                        <hr className="hrfour"></hr>
                    </div>
                    <div className="link-holder">
                        <a href="mailto:fabdev90@outlook.com" className="contact-link">
                        <strong>Email</strong>
                        <FontAwesomeIcon icon="envelope" />
                        
                    </a>

                    <a
                        href="https://www.linkedin.com/in/faithbdev"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-link"
                    >
                        <strong>LinkedIn</strong>
                        <FontAwesomeIcon icon={["fab", "linkedin"]} />
                    </a>

                    <a
                        href="https://github.com/faithbrnttt"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-link"
                    >
                        <strong>GitHub</strong>
                        <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>

                    <a
                        href="/Faith_Burnett_Resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-link"
                    >
                        <strong>Resume</strong>
                        <FontAwesomeIcon icon="file-pdf" />
                    </a>
                    </div>
                    <div className="abstract">
                        <hr className="hrfive"></hr>
                        <hr className="hrsix"></hr>
                        <hr className="hrseven"></hr>
                        <hr className="hreight"></hr>
                        
                    </div>
                </div>

            </div>
        </section>
    );
}
