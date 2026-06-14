type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold">Article: {slug}</h1>
    </div>
  );
}
