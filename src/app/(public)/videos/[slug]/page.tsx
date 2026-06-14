type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold">Video: {slug}</h1>
    </div>
  );
}
