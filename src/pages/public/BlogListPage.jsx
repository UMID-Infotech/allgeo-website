// src/pages/public/BlogListPage.jsx
//
// /blog                    -> all blogs
// /blog?category=<slug>    -> blogs of one category (sidebar links on the
//                             blog detail page point here)
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import BlogCard from "@/components/blog/BlogCard";
import { getBlogCategories, getBlogs } from "@/services/blogService";

function BlogListPage() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const [categories, setCategories] = useState([]);
  const [result, setResult] = useState({
    key: null,
    blogs: [],
    error: "",
  });

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

  useEffect(() => {
    let isMounted = true;

    getBlogs({ category: activeCategory || undefined })
      .then((blogs) => {
        if (isMounted) setResult({ key: activeCategory, blogs, error: "" });
      })
      .catch((error) => {
        if (isMounted) {
          setResult({
            key: activeCategory,
            blogs: [],
            error: error.message || "Unable to load blogs.",
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const isLoading = result.key !== activeCategory;
  const activeName = categories.find((c) => c.slug === activeCategory)?.name;

  const chipClass = (isActive) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? "border-[var(--color-green)] bg-[var(--color-green)] !text-white"
        : "border-[var(--color-border)] bg-white text-[var(--color-navy)] hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
    }`;

  return (
    <>
      <section className="bg-[var(--color-navy-dark)] py-16 text-white sm:py-20">
        <div className="site-container">
          <p className="section-eyebrow">Our Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {activeName ? activeName : "Insights & Articles"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            Updates, knowledge and field experience from the AllGeo Solutions
            team.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="site-container section-spacing">
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <Link to="/blog" className={chipClass(!activeCategory)}>
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.slug}`}
                  className={chipClass(activeCategory === category.slug)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {isLoading && (
            <p className="py-10 text-center text-sm text-[var(--color-text-muted)]">
              Loading blogs...
            </p>
          )}

          {!isLoading && result.error && (
            <p className="py-10 text-center text-sm text-red-600">
              {result.error}
            </p>
          )}

          {!isLoading && !result.error && result.blogs.length === 0 && (
            <p className="py-10 text-center text-sm text-[var(--color-text-muted)]">
              No blogs found.
            </p>
          )}

          {!isLoading && !result.error && result.blogs.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BlogListPage;