// /app/blog/[slug]/page.jsx
// ✅ SERVER COMPONENT — No "use client" directive
// Handles: SEO metadata, canonical URLs, server-side data fetching, JSON-LD schema

import BlogDetailClient from "./BlogDetailClient";
import { getBlogBySlug, BLOGS } from "../blogData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Allow slugs NOT in generateStaticParams to be rendered on-demand
// (covers new blog posts added to backend after build, and local blogData fallback)
export const dynamicParams = true;

// -------------------------------------------------------
// 1. PRE-RENDER ALL BLOG PAGES AT BUILD TIME
//    Requires backend endpoint: GET /api/blogs/public/all-slugs
//    Response shape: { success: true, slugs: ["slug-one", "slug-two", ...] }
// -------------------------------------------------------
export async function generateStaticParams() {
  const localSlugs = BLOGS.filter(b => b.slug).map(b => ({ slug: b.slug }));
  try {
    const res = await fetch(`${API_URL}/blogs/public/all-slugs`, {
      next: { revalidate: 86400 },
    });
    const data = await res.json();
    const apiSlugs = (data.slugs || []).map((slug) => ({ slug }));
    const all = [...localSlugs, ...apiSlugs];
    const seen = new Set();
    return all.filter(({ slug }) => seen.has(slug) ? false : seen.add(slug));
  } catch (err) {
    console.error("[generateStaticParams] Failed to fetch slugs:", err);
    return localSlugs;
  }
}

// -------------------------------------------------------
// 2. PER-PAGE SEO METADATA
//    Fixes: unique title, canonical URL, meta description,
//    Open Graph, Twitter Card — all per blog post
// -------------------------------------------------------
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_URL}/blogs/public/${slug}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();

    if (!data.success || !data.data) {
      return { title: "Article Not Found | SIACC" };
    }

    const blog = data.data;
    const description = blog.metaDescription || blog.excerpt || "";
    const image = blog.heroImg || blog.img || "https://siacc.co.in/og-image.jpg";
    const url = `https://siacc.co.in/blog/${slug}`;

    return {
      title: `${blog.title} | SIACC`,
      description,

      // ✅ Fixes wrong canonical (was pointing to homepage)
      alternates: {
        canonical: url,
      },

      openGraph: {
        title: blog.title,
        description,
        url,
        type: "article",
        siteName: "SIACC India",
        locale: "en_IN",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        article: {
          publishedTime: blog.publishedAt || blog.date,
          authors: [blog.author || "SIACC Experts"],
          tags: [blog.tag],
        },
      },

      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [image],
      },
    };
  } catch (err) {
    console.error("[generateMetadata] Error:", err);
    return { title: "Blog | SIACC" };
  }
}

// -------------------------------------------------------
// 3. SERVER-SIDE DATA FETCH
//    Blog content is fetched on the server → baked into HTML
//    Googlebot reads full content without needing JavaScript
// -------------------------------------------------------
export default async function BlogPage({ params }) {
  const { slug } = await params;
  let blog = null;
  let notFound = false;

  try {
    const res = await fetch(`${API_URL}/blogs/public/${slug}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();

    if (data.success && data.data) {
      blog = data.data;
    }
  } catch (err) {
    console.error("[BlogPage] Fetch error:", err);
  }

  // Fall back to local blogData if API returned nothing
  if (!blog) {
    blog = getBlogBySlug(slug);
  }

  if (!blog) {
    notFound = true;
  }

  // -------------------------------------------------------
  // 4. JSON-LD STRUCTURED DATA (Article Schema)
  //    Helps Google show rich results (date, author, breadcrumb)
  // -------------------------------------------------------
  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.title,
        description: blog.metaDescription || blog.excerpt || "",
        image: blog.heroImg || blog.img,
        datePublished: blog.publishedAt || blog.date,
        dateModified: blog.updatedAt || blog.publishedAt || blog.date,
        author: {
          "@type": "Person",
          name: blog.author || "SIACC Experts",
        },
        publisher: {
          "@type": "Organization",
          name: "SIACC India",
          logo: {
            "@type": "ImageObject",
            url: "https://siacc.co.in/finalimages/starlogo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://siacc.co.in/blog/${slug}`,
        },
      }
    : null;

  return (
    <>
      {/* Inject JSON-LD schema into <head> */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Pass server-fetched data to client component */}
      <BlogDetailClient blog={blog} notFound={notFound} />
    </>
  );
}