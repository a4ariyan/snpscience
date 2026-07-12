import { teamMembers } from "@/shared/about-content";

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toFlat(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const paths: { slug: string[] }[] = [{ slug: [] }]; // /about-us

  for (const member of teamMembers) {
    paths.push({ slug: [member.id] }); // /about-us/ceo
    paths.push({ slug: [toSlug(member.name)] }); // /about-us/omar-hassan
    paths.push({ slug: [toFlat(member.name)] }); // /about-us/omarhassan
  }

  return paths;
}