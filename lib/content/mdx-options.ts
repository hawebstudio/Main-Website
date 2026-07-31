import remarkGfm from 'remark-gfm'

/**
 * Options passed to every `<MDXRemote>` call site.
 *
 * Without `remark-gfm`, MDX only understands CommonMark — GitHub-Flavored
 * Markdown tables (`| a | b |`), strikethrough, task lists, and autolinked
 * URLs are left as literal text instead of being parsed. That's why tables
 * inside insight/problem/technology/case-study MDX content were rendering
 * as a raw wall of `|`-delimited text instead of an actual `<table>`.
 */
export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
}
