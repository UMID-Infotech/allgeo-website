// src/pages/public/BlogDetailPage.jsx
//
// Layout: featured image on top, then title + full content.
// Sidebar (beside the content): all categories.
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { formatBlogDate } from "@/lib/blogDate";
import { resolveImageUrl } from "@/lib/imagekitUpload";
import { getBlogBySlug, getBlogCategories } from "@/services/blogService";

import "@/styles/blog-content.css";

function BlogDetailPage() {
  const { slug } = useParams();

  const [result, setResult] = useState({ slug: null, blog: null });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getBlogBySlug(slug)
      .then((blog) => {
        if (isMounted) setResult({ slug, blog });
      })
      .catch(() => {
        if (isMounted) setResult({ slug, blog: null });
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    let isMounted = true;

    getBlogCategories()
      .then((data) => {
        if (isMounted) setCategories(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Scroll to the top when opening a blog from a card.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  // Browser tab title
  useEffect(() => {
    if (!result.blog) return undefined;
    const previousTitle = document.title;
    document.title = `${result.blog.title} | AllGeo Solutions`;
    return () => {
      document.title = previousTitle;
    };
  }, [result.blog]);

  const isLoading = result.slug !== slug;
  const { blog } = result;

  if (!isLoading && !blog) {
    return <Navigate to="/blog" replace />;
  }

  if (isLoading) {
    return (
      <div className="site-container py-24 text-center text-sm text-[var(--color-text-muted)]">
        Loading blog...
      </div>
    );
  }

  const blogCategoryIds = blog.categories.map((category) => category._id);

  return (
    <section className="bg-white">
      <div className="site-container py-10 sm:py-14 lg:py-16">
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] transition-colors duration-200 hover:text-[var(--color-green)]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All Blogs
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          {/* ---------------- Main column ---------------- */}
          <article className="min-w-0">
            {/* 1. Featured image at the top */}
            <img
              src={resolveImageUrl(blog.coverImage)}
              alt={blog.title}
              fetchPriority="high"
              className="aspect-[16/9] w-full rounded-2xl border border-[var(--color-border)] object-cover shadow-[0_12px_35px_rgba(8,45,87,0.09)]"
            />

            {/* 2. Title + meta */}
            <header className="mt-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                  <Calendar aria-hidden="true" className="h-4 w-4" />
                  {formatBlogDate(blog.createdAt)}
                </span>

                {blog.categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/blog?category=${category.slug}`}
                    className="rounded-full bg-[var(--color-green-light)] px-3 py-1 text-xs font-semibold text-[var(--color-green-dark)] transition-colors duration-200 hover:bg-[var(--color-green)] hover:!text-white"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-[2.6rem]">
                {blog.title}
              </h1>
            </header>

            {/* 3. Full content (HTML is sanitised on the server before saving) */}
            <div
              className="blog-content mt-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* ---------------- Sidebar: categories ---------------- */}
          <aside className="lg:sticky lg:top-[calc(var(--header-height)+24px)] lg:self-start">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-soft)] p-6">
              <h2 className="text-lg font-bold text-[var(--color-navy)]">
                Categories
              </h2>
              <div className="mt-2 h-0.5 w-10 bg-[var(--color-green)]" />

              {categories.length === 0 ? (
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                  No categories yet.
                </p>
              ) : (
                <ul className="mt-4 space-y-1">
                  {categories.map((category) => {
                    const isCurrent = blogCategoryIds.includes(category._id);

                    return (
                      <li key={category._id}>
                        <Link
                          to={`/blog?category=${category.slug}`}
                          className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-white hover:text-[var(--color-green)] ${
                            isCurrent
                              ? "bg-white text-[var(--color-green)]"
                              : "text-[var(--color-navy)]"
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
                            {category.blogCount}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailPage;