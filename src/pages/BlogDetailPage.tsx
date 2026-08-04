import { Link, Navigate, useParams } from "react-router-dom";
import { getBlogBySlug, BLOG_POSTS } from "../data/blogs";

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="bg-charcoal pb-20 pt-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Link to="/blog" className="text-sm font-semibold text-zinc-500 transition hover:text-volt">
          ← All articles
        </Link>

        <p className="mt-8 text-[10px] font-bold tracking-[0.25em] text-volt uppercase">
          {post.category} · {post.readTime} · {post.date}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-zinc-400">{post.excerpt}</p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4 md:px-6">
        <div className="overflow-hidden rounded-sm border-2 border-volt/20">
          <img src={post.image} alt={post.title} className="aspect-[21/9] w-full object-cover" />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-10 px-4 md:px-6">
        {post.sections.map((section) => (
          <section key={section.heading ?? section.paragraphs[0]}>
            {section.heading && (
              <h2 className="font-display text-2xl text-volt sm:text-3xl">{section.heading}</h2>
            )}
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-zinc-300">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-zinc-300">
                    <span className="font-bold text-volt">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="rounded-sm border-2 border-volt/25 bg-volt/5 p-6 text-center">
          <p className="font-display text-2xl text-white">Ready to apply this on the floor?</p>
          <Link to="/plans" className="btn-power mt-5 inline-flex min-h-[48px] items-center px-8">
            Join Ace Factor
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl px-4 md:px-6">
          <h2 className="font-display text-3xl text-white">MORE TO READ</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="overflow-hidden rounded-sm border-2 border-volt/15 transition hover:border-volt/40"
              >
                <img src={r.image} alt="" className="aspect-[16/9] w-full object-cover" />
                <div className="border-t border-volt/10 p-4">
                  <h3 className="font-display text-xl text-white">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
