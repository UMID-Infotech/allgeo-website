// src/pages/public/ProjectDetailPage.jsx   (route: /projects/:slug)
//
// Layout: featured image on top, then title + full content below.
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { formatBlogDate } from "@/lib/blogDate";
import { resolveImageUrl } from "@/lib/imagekitUpload";
import { getProjectBySlug } from "@/services/projectService";

import "@/styles/blog-content.css";

function ProjectDetailPage() {
  const { slug } = useParams();

  const [result, setResult] = useState({ slug: null, project: null });

  useEffect(() => {
    let isMounted = true;

    getProjectBySlug(slug)
      .then((project) => {
        if (isMounted) setResult({ slug, project });
      })
      .catch(() => {
        if (isMounted) setResult({ slug, project: null });
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Scroll to the top when opening a project from a card.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  // Browser tab title
  useEffect(() => {
    if (!result.project) return undefined;
    const previousTitle = document.title;
    document.title = `${result.project.title} | AllGeo Solutions`;
    return () => {
      document.title = previousTitle;
    };
  }, [result.project]);

  const isLoading = result.slug !== slug;
  const { project } = result;

  if (!isLoading && !project) {
    return <Navigate to="/projects" replace />;
  }

  if (isLoading) {
    return (
      <div className="site-container py-24 text-center text-sm text-[var(--color-text-muted)]">
        Loading project...
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="site-container py-10 sm:py-14 lg:py-16">
        <Link
          to="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] transition-colors duration-200 hover:text-[var(--color-green)]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All Projects
        </Link>

        <article className="mx-auto max-w-4xl">
          {/* 1. Featured image at the top */}
          <img
            src={resolveImageUrl(project.coverImage)}
            alt={project.title}
            fetchPriority="high"
            className="aspect-[16/9] w-full rounded-2xl border border-[var(--color-border)] object-cover shadow-[0_12px_35px_rgba(8,45,87,0.09)]"
          />

          {/* 2. Title + date */}
          <header className="mt-8">
            <span className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
              <Calendar aria-hidden="true" className="h-4 w-4" />
              {formatBlogDate(project.createdAt)}
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-[2.6rem]">
              {project.title}
            </h1>
          </header>

          {/* 3. Full content (HTML is sanitised on the server before saving) */}
          <div
            className="blog-content mt-8"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </article>
      </div>
    </section>
  );
}

export default ProjectDetailPage;