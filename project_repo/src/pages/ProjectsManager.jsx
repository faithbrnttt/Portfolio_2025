// src/pages/ProjectsManager.jsx
import { useEffect, useState } from "react";
import ProjectForm from "../components/ProjectForm";

const API = "http://localhost:3500"; // change to "" if using a Vite proxy for /api

export default function ProjectsManager() {
    const [projects, setProjects] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const idOf = (p) => p.id || p._id;

    const load = async () => {
        setLoading(true);
        setErr("");
        try {
            const res = await fetch(`${API}/api/projects`);
            if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
            setProjects(await res.json());
        } catch (e) {
            setErr(e.message || "Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (p) => {
        if (!confirm(`Delete "${p.title}"?`)) return;
        try {
            const res = await fetch(`${API}/api/projects/${idOf(p)}`, { method: "DELETE" });
            if (!res.ok && res.status !== 204) {
                throw new Error(`Failed to delete (${res.status})`);
            }
            if (editing && idOf(editing) === idOf(p)) setEditing(null);
            await load();
        } catch (e) {
            alert(e.message || "Failed to delete");
        }
    };

    return (
        <>
            <h1>Project Manager</h1>

            <div className="content-container">
                <div className="form-container">
                    <h2 className="form-title">{editing ? "Edit Project" : "Create Project"}</h2>
                    <ProjectForm
                        project={editing}
                        onSuccess={() => { setEditing(null); load(); }}
                        onCancel={() => setEditing(null)}
                    />
                </div>

                <div class="list-container">
                    <h2 className="form-title">All Projects</h2>
                    {loading && <p>Loading…</p>}
                    {err && <p>Error: {err}</p>}
                    {!loading && !err && !projects.length && <p>No projects yet.</p>}

                    {!loading && !err && projects.length > 0 && (
                        <table id="projects-table">
                            <tbody>
                                {projects.map((p) => (
                                    <tr key={idOf(p)}>
                                        <td className="title-cell" title={p.title}>{p.title}</td>
                                        
                                        <td>
                                            <button onClick={() => setEditing(p)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(p)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <button className="r-btn" onClick={load}>Refresh</button>
                </div>
            </div>
        </>
    );
}
