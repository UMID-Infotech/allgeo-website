// src/components/blog/BlogCard.jsx
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

import { formatBlogDate } from "@/lib/blogDate";
import { resolveImageUrl } from "@/lib/imagekitUpload";

function BlogCard({ blog }) {
  const blogUrl = `/blog/${blog.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_30px_rgba(8,45,87,0.05)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(8,45,87,0.10)] motion-reduce:transform-none">
      <Link
        to={blogUrl}
        aria-label={`Read ${blog.title}`}
        className="block overflow-hidden"
      >
        <img
          src={resolveImageUrl(blog.coverImage)}
          alt={blog.title}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {blog.categories.slice(0, 2).map((category) => (
            <span
              key={category._id}
              className="rounded-full bg-[var(--color-green-light)] px-3 py-1 text-xs font-semibold text-[var(--color-green-dark)]"
            >
              {category.name}
            </span>
          ))}

          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
            {formatBlogDate(blog.createdAt)}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-[var(--color-navy)]">
          <Link
            to={blogUrl}
            className="transition-colors duration-200 hover:text-[var(--color-green)]"
          >
            {blog.title}
          </Link>
        </h3>

        {blog.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-muted)]">
            {blog.excerpt}
          </p>
        )}

        <Link
          to={blogUrl}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[var(--color-green)] transition-colors duration-200 hover:text-[var(--color-green-dark)]"
        >
          Read More
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;