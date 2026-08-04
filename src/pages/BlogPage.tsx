import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogs";
import { PageHero } from "../components/PageHero";
import { BLOG_IMAGES } from "../data/blogs";

export function BlogPage() {
  return (
    <>
      <PageHero
        image={BLOG_IMAGES.progressive}
        title="TRAINING BLOG"
        subtitle="Form, progressive overload, and gym-floor habits that actually work."
        objectPosition="center center"
      />

      <section className="border-t border-volt/10 bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-volt uppercase">Knowledge Base</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">READ. TRAIN. GROW.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-sm border-2 border-volt/15 bg-charcoal-light transition hover:-translate-y-1 hover:border-volt/45"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-volt/10 p-5">
                  <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-volt uppercase">
                    <span>{post.category}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-500">{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-white group-hover:text-volt">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{post.excerpt}</p>
                  <span className="mt-4 inline-flex text-xs font-bold tracking-wide text-volt uppercase">
                    Read article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
