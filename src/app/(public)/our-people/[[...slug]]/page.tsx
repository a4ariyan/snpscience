import { AboutUs } from "@/components/about/AboutUs";
import { ourPeopleMetadata } from "@/lib/seo/our-people-metadata";
import { teamMembers } from "@/shared/about-content";

export const metadata = ourPeopleMetadata;

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toFlat(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const paths: { slug: string[] }[] = [{ slug: [] }]; // /our-people

  for (const member of teamMembers) {
    paths.push({ slug: [member.id] }); // /our-people/ceo
    paths.push({ slug: [toSlug(member.name)] }); // /our-people/omar-hassan
    paths.push({ slug: [toFlat(member.name)] }); // /our-people/omarhassan
  }

  return paths;
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function OurPeoplePage({ params }: PageProps) {
  const { slug } = await params;
  const usernameParam = slug?.[0]; // If the URL is /our-people/omarhassan
  
  let highlightedMemberId: string | undefined;
  
  if (usernameParam) {
    const flatUsername = usernameParam.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // First try exact match on flat name, arabic name, or id
    let member = teamMembers.find(m => {
      const flatName = m.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const flatNameAr = m.nameAr.toLowerCase().replace(/[^a-z0-9]/g, '');
      return flatName === flatUsername || flatNameAr === flatUsername || m.id.toLowerCase() === flatUsername;
    });

    // Fuzzy fallback (e.g. omarhasan matches omarhassan)
    if (!member) {
      member = teamMembers.find(m => {
        const flatName = m.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        // Allow match if one string is fully contained within the other
        return flatName.includes(flatUsername) || flatUsername.includes(flatName);
      });
    }

    if (member) {
      highlightedMemberId = member.id;
    }
  }

  return <AboutUs highlightedMemberId={highlightedMemberId} />;
}
