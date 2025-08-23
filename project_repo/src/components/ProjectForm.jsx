// src/components/ProjectForm.jsx
import { useEffect, useRef, useState } from "react";

export default function ProjectForm({
    project = null,           // pass a project to edit; null for create
    onSuccess = () => { },     // called after successful create/update
    onCancel = () => { },      // called when cancel edit
}) {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        repoUrl: "",
        technologies: "",
        image: null,
    });

    // Populate for edit; clear for create
    useEffect(() => {
        if (project) {
            setForm({
                title: project.title || "",
                description: project.description || "",
                repoUrl: project.codeUrl || "",
                technologies: Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : (project.technologies || ""),
                image: null,
            });
        } else {
            setForm({
                title: "",
                description: "",
                repoUrl: "",
                technologies: "",
                image: null,
            });
            formRef.current?.reset();
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formEl = formRef.current;

        const data = new FormData();
        data.append("title", form.title);
        data.append("description", form.description);
        data.append("codeUrl", form.repoUrl);
        if (form.technologies.trim()) data.append("technologies", form.technologies);
        if (form.image) data.append("image", form.image);

        try {
            const url = project
                ? `http://localhost:3500/api/projects/${project.id || project._id}`
                : `http://localhost:3500/api/projects`;
            const method = project ? "PUT" : "POST";

            const res = await fetch(url, { method, body: data });
            if (!res.ok) throw new Error("Request failed");
            await res.json();

            // reset form & notify parent
            setForm({ title: "", description: "", repoUrl: "", technologies: "", image: null });
            formEl?.reset();
            onSuccess();
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <label className="block" htmlFor="title">Title</label>
            <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                
            />

            <label className="block" htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                
            />

            <label className="block" htmlFor="repoUrl">Repo URL</label>
            <input
                id="repoUrl"
                name="repoUrl"
                type="url"
                value={form.repoUrl}
                onChange={handleChange}
                
            />

            <label className="block" htmlFor="technologies">Technologies</label>
            <input
                id="technologies"
                name="technologies"
                type="text"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, AWS S3"
                aria-describedby="tech-help"
            />
            

            {project?.image?.url ? (
                <>
                    <label>Current Image</label>
                    <img src={project.image.url} alt="" width="180" />
                </>
            ) : null}

            <label className="block" htmlFor="image">Image {project ? "(leave blank to keep current)" : ""}</label>
            <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
            />

            <button className="s-btn" type="submit" disabled={loading}>
                {loading ? (project ? "Updating..." : "Saving...") : (project ? "Update Project" : "Save Project")}
            </button>

            {project ? (
                <button  className="s-btn" type="button" onClick={onCancel}>
                    Cancel
                </button>
            ) : null}
        </form>
    );
}
