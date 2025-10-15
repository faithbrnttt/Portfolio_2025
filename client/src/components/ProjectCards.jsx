// src/components/ProjectsCards.jsx
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SiMongodb, SiAmazons3 } from "react-icons/si";

// Font Awesome brands (add faAws)
import {
    faReact, faJs, faNodeJs, faHtml5, faCss3Alt, faPython, faAws
} from "@fortawesome/free-brands-svg-icons";

const API = import.meta.env.VITE_API_URL || "http://localhost:3500";

// Map of normalized tech name -> JSX icon
const ICON_MAP = {
    react: <FontAwesomeIcon icon={faReact} />,
    javascript: <FontAwesomeIcon icon={faJs} />,   // on FA v5 use faJsSquare
    "node.js": <FontAwesomeIcon icon={faNodeJs} />,
    node: <FontAwesomeIcon icon={faNodeJs} />,
    html: <FontAwesomeIcon icon={faHtml5} />,
    css: <FontAwesomeIcon icon={faCss3Alt} />,
    python: <FontAwesomeIcon icon={faPython} />,

    mongodb: <SiMongodb />,
    "mongo db": <SiMongodb />,
    mongo: <SiMongodb />,

    s3: <SiAmazons3 />,
    "amazon s3": <SiAmazons3 />,

    // use FA for generic AWS
    aws: <FontAwesomeIcon icon={faAws} />,
    "amazon web services": <FontAwesomeIcon icon={faAws} />,
};


// Normalize technologies prop to a lowercased array
function normalizeTechList(techs) {
    if (Array.isArray(techs)) return techs.map(t => String(t).trim().toLowerCase());
    if (techs == null) return [];
    return String(techs)
        .split(",")
        .map(t => t.trim().toLowerCase())
        .filter(Boolean);
}

function TechIcons({ techs }) {
    const list = normalizeTechList(techs);

    // de-dupe and map to icons
    const seen = new Set();
    const items = [];
    for (const key of list) {
        const icon = ICON_MAP[key];
        if (icon && !seen.has(key)) {
            seen.add(key);
            items.push(
                <span className="tech-icon" key={key} title={key}>
                    {icon}
                </span>
            );
        }
    }
    return <div className="tech-icons">{items}</div>;
}

export default function ProjectsCards() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API}/api/projects`);
                if (!res.ok) throw new Error(`Failed to load (${res.status})`);
                const data = await res.json();
                setProjects(Array.isArray(data) ? data : []);
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
            {projects.map((p, index) => {
                const id = p._id || p.id || p.slug || index;
                const img = (p?.image?.url || p?.imageUrl || "").replace(/ /g, "%20");

                return (
                    <div className="card" key={id}>
                        <img
                            className="card-image"
                            src={img}
                            alt={p.title || "Project"}
                            loading="lazy"
                        />
                        <div className="card-overlay">
                            <div className="card-spacing">
                                <h3 className="card-title">{p.title}</h3>
                                <p className="card-desc">{p.description}</p>

                                {/* Tech icons */}
                                <div className="t-icons">
                                    <TechIcons techs={p.technologies} />
                                </div>

                                {p.codeUrl ? (
                                    <a className="button" href={p.codeUrl} target="_blank" rel="noreferrer">
                                        Repo
                                    </a>
                                ) : (
                                    <span className="button" aria-disabled="true">No repo</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
