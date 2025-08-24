// src/components/ProjectsCards.jsx
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function ProjectsCards() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API}/api/projects`);
                if (!res.ok) throw new Error(`Failed to load (${res.status})`);
                setProjects(await res.json());
            } catch (e) {
                setErr(e.message || "Failed to load projects");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>Loading…</p>;
    if (err) return <p>Error: {err}</p>;
    if (!projects.length) return <p>No projects yet.</p>;

    return (
        <>
            {projects.map((p) => {
                const id = p.id || p._id;
                const img = p.image?.url || p.imageUrl || "";
                const repo = p.codeUrl || "";
                return (
                    <div className="item11" key={id}>
                        {/* simplest: dynamic bg via style prop */}
                        <div
                            className="card"
                            style={{
                                backgroundImage: img ? `url(${img})` : undefined,
                            }}
                        >
                            <div className="head">{p.title}</div>
                            <div className="content">
                                {p.description || ""}
                                <br />
                                {repo ? (
                                    <a className="button" href={repo} target="_blank" rel="noreferrer">
                                        Repo
                                    </a>
                                ) : (
                                    <span className="button disabled" aria-disabled="true">No repo</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
