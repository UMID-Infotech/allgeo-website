// src/components/home/BlogSection.jsx
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import BlogCard from "@/components/blog/BlogCard";
import { getBlogs } from "@/services/blogService";

const HOME_BLOG_LIMIT = 6;

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getBlogs({ limit: HOME_BLOG_LIMIT })
      .then((data) => {
        if (isMounted) setBlogs(data);
      })
      .catch(() => {
        if (isMounted) setHasError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Nothing to show (no blogs yet / API error) -> keep the home page clean.
  if (!isLoading && (hasError || blogs.length === 0)) {
    return null;
  }

  return (
    <section
      aria-labelledby="blog-heading"
      className="relative overflow-hidden bg-[var(--color-background-soft)]"
    >
      <div className="site-container section-spacing relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Our Blog</p>
            <h2
              id="blog-heading"
              className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-[2.65rem]"
            >
              Latest Insights &amp; Articles
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors duration-200 hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
          >
            View All Blogs
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {/* Responsive grid: 1 column (mobile) / 2 (tablet) / 3 (desktop) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [0, 1, 2].map((placeholder) => (
                <div
                  key={placeholder}
                  className="animate-pulse overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white"
                >
                  <div className="aspect-[16/9] w-full bg-slate-200" />
                  <div className="space-y-3 p-5 sm:p-6">
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-5/6 rounded bg-slate-100" />
                  </div>
                </div>
              ))
            : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;