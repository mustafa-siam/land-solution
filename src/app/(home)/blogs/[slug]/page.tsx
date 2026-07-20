import BlogDetails from "@/components/layout/Home/Blog/BlogDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  return (
    <main>
      <BlogDetails slug={params.slug} />
    </main>
  );
}
