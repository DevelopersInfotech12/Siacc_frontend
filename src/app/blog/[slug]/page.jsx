// /app/blog/[slug]/page.jsx
// ✅ SERVER COMPONENT — No "use client" directive
// Handles: SEO metadata, canonical URLs, server-side data fetching, JSON-LD schema

import BlogDetailClient from "./BlogDetailClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// -------------------------------------------------------
// 1. PRE-RENDER ALL BLOG PAGES AT BUILD TIME
//    Requires backend endpoint: GET /api/blogs/public/all-slugs
//    Response shape: { success: true, slugs: ["slug-one", "slug-two", ...] }
// -------------------------------------------------------
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/blogs/public/all-slugs`, {
      next: { revalidate: 86400 }, // refresh slug list every 24 hours
    });
    const data = await res.json();
    return (data.slugs || []).map((slug) => ({ slug }));
  } catch (err) {
    console.error("[generateStaticParams] Failed to fetch slugs:", err);
    return [];
  }
}

// -------------------------------------------------------
// 2. PER-PAGE SEO METADATA
//    Fixes: unique title, canonical URL, meta description,
//    Open Graph, Twitter Card — all per blog post
// -------------------------------------------------------
export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${API_URL}/blogs/public/${params.slug}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();

    if (!data.success || !data.data) {
      return { title: "Article Not Found | SIACC" };
    }

    const blog = data.data;
    const description = blog.metaDescription || blog.excerpt || "";
    const image = blog.heroImg || blog.img || "https://siacc.co.in/og-image.jpg";
    const url = `https://siacc.co.in/blog/${params.slug}`;

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
  let blog = null;
  let notFound = false;

  try {
    const res = await fetch(`${API_URL}/blogs/public/${params.slug}`, {
      next: { revalidate: 3600 }, // ISR: revalidate page every 1 hour
    });
    const data = await res.json();

    if (data.success && data.data) {
      blog = data.data;
    } else {
      notFound = true;
    }
  } catch (err) {
    console.error("[BlogPage] Fetch error:", err);
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
          "@id": `https://siacc.co.in/blog/${params.slug}`,
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