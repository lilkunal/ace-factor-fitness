import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogs";

/** Home teaser — three blog cards for client presentation. */
export function BlogTeaser() {
  return (
    <section className="border-y border-volt/10 bg-charcoal-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-volt uppercase">Motivation & Method</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">FROM CORE TO MAX</h2>
          </div>
          <Link to="/blog" className="text-sm font-bold tracking-wide text-volt uppercase hover:text-gold">
            All articles →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-sm border-2 border-volt/15 transition hover:border-volt/40"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-volt/10 bg-charcoal p-5">
                <p className="text-[10px] font-bold tracking-widest text-volt uppercase">{post.category}</p>
                <h3 className="mt-2 font-display text-xl leading-tight text-white group-hover:text-volt">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
