import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts } from "@/config/content";

/* ─── Static Params ─── */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found | Wealth Acumen" };

  return {
    title: `${post.title} | Wealth Acumen Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/* ─── Page Component ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-cyan-500/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-indigo-400 font-medium">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-sm text-slate-600">{post.author}</span>
          </div>

          <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="section-padding pt-8">
        <div className="max-w-4xl mx-auto">
          {/* Post Feature Image */}
          {post.image && (
            <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden mb-8 border border-slate-200 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 992px) 100vw, 896px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}

          {/* Full article content */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-slate-700 leading-relaxed text-base md:text-lg">
              {post.content}
            </p>
          </div>

          {/* Key Points */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-slate-900">
                Key Points
              </h2>
            </div>

            <ul className="space-y-4">
              {post.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 shrink-0" />
                  <span className="text-slate-600 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to All Posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
