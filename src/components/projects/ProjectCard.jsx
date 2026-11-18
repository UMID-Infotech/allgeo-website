// src/components/projects/ProjectCard.jsx
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

import { formatBlogDate } from "@/lib/blogDate";
import { resolveImageUrl } from "@/lib/imagekitUpload";

function ProjectCard({ project }) {
  const projectUrl = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_30px_rgba(8,45,87,0.05)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(8,45,87,0.10)] motion-reduce:transform-none">
      <Link
        to={projectUrl}
        aria-label={`View ${project.title}`}
        className="block overflow-hidden"
      >
        <img
          src={resolveImageUrl(project.coverImage)}
          alt={project.title}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
          {formatBlogDate(project.createdAt)}
        </span>

        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-[var(--color-navy)]">
          <Link
            to={projectUrl}
            className="transition-colors duration-200 hover:text-[var(--color-green)]"
          >
            {project.title}
          </Link>
        </h3>

        {project.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-muted)]">
            {project.excerpt}
          </p>
        )}

        <Link
          to={projectUrl}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[var(--color-green)] transition-colors duration-200 hover:text-[var(--color-green-dark)]"
        >
          View Project
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;