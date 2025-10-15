// src/components/ProjectForm.jsx
import { useEffect, useRef, useState } from "react";

const API = import.meta.env?.VITE_API_URL || "http://localhost:3500";

export default function ProjectForm({ project = null, onSuccess = () => { }, onCancel = () => { } }) {
    const isEdit = !!(project && (project._id || project.id));
    const getId = (p) => p?.id || p?._id;

    const formEl = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        technologies: "",
        codeUrl: "",
        appUrl: "",
        imageFile: null,
        removeImage: false,
    });

    // Seed values when editing
    useEffect(() => {
        if (!project) {
            setForm({
                title: "",
                description: "",
                technologies: "",
                codeUrl: "",
                appUrl: "",
                imageFile: null,
                removeImage: false,
            });
            return;
        }
        setForm((f) => ({
            ...f,
            title: project.title || "",
            description: project.description || "",
            technologies: Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : (project.technologies || ""),
            codeUrl: project.codeUrl || "",
            appUrl: project.appUrl || "",
            imageFile: null,
            removeImage: false,
        }));
    }, [project]);

    const onChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setForm((f) => ({ ...f, imageFile: files?.[0] || null }));
        } else if (type === "checkbox") {
            setForm((f) => ({ ...f, [name]: checked }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Build FormData to support optional image
            const fd = new FormData();
            fd.append("title", form.title.trim());
            fd.append("description", form.description.trim());
            fd.append("technologies", form.technologies); // server can split by comma
            fd.append("codeUrl", form.codeUrl.trim());
            fd.append("appUrl", form.appUrl.trim());
            fd.append("removeImage", String(form.removeImage));
            if (form.imageFile) fd.append("image", form.imageFile);

            // 🔑 Decide endpoint + method based on isEdit
            const id = getId(project);
            const url = isEdit ? `${API}/api/projects/${id}` : `${API}/api/projects`;
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: fd, // IMPORTANT: no manual Content-Type, let browser add boundary
            });

            if (!res.ok) {
                const msg = await res.text().catch(() => "");
                throw new Error(`Failed to ${isEdit ? "update" : "create"} project (${res.status}) ${msg}`);
            }

            // success
            onSuccess();
            if (!isEdit && formEl.current) formEl.current.reset();
        } catch (err) {
            setError(err.message || "Submit failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form ref={formEl} onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <label>
                Title
                <input name="title" value={form.title} onChange={onChange} required />
            </label>

            <label>
                Description
                <textarea name="description" value={form.description} onChange={onChange} />
            </label>

            <label>
                Technologies (comma separated)
                <input name="technologies" value={form.technologies} onChange={onChange} />
            </label>

            <label>
                Code URL
                <input name="codeUrl" value={form.codeUrl} onChange={onChange} />
            </label>

            <label>
                App URL
                <input name="appUrl" value={form.appUrl} onChange={onChange} />
            </label>

            <label>
                Image
                <input type="file" name="image" accept="image/*" onChange={onChange} />
            </label>

            {isEdit && (
                <label className="inline">
                    <input
                        type="checkbox"
                        name="removeImage"
                        checked={form.removeImage}
                        onChange={onChange}
                    />
                    Remove existing image
                </label>
            )}

            <div className="actions">
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
                </button>
                <button type="button" onClick={onCancel} disabled={loading}>
                    Cancel
                </button>
            </div>
            
        </form>
    );
}
