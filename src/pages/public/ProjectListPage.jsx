// src/pages/public/ProjectListPage.jsx   (route: /projects)
import { useEffect, useState } from "react";

import ProjectCard from "@/components/projects/ProjectCard";
import { getProjects } from "@/services/projectService";

function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getProjects()
      .then((data) => {
        if (isMounted) setProjects(data);
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message || "Unable to load projects.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="bg-[var(--color-navy-dark)] py-16 text-white sm:py-20">
        <div className="site-container">
          <p className="section-eyebrow">Our Projects</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Projects We&apos;ve Delivered
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            A selection of geoscience investigations and field assignments
            carried out by the AllGeo Solutions team.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="site-container section-spacing">
          {isLoading && (
            <p className="py-10 text-center text-sm text-[var(--color-text-muted)]">
              Loading projects...
            </p>
          )}

          {!isLoading && error && (
            <p className="py-10 text-center text-sm text-red-600">{error}</p>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <p className="py-10 text-center text-sm text-[var(--color-text-muted)]">
              No projects have been added yet.
            </p>
          )}

          {!isLoading && !error && projects.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProjectListPage;