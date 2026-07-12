import { AboutUs } from "@/components/about/AboutUs";
import { aboutUsMetadata } from "@/lib/seo/about-metadata";
import { teamMembers } from "@/shared/about-content";
import { generateStaticParams as params } from "./route-params";

export const metadata = aboutUsMetadata;

export const generateStaticParams = params;

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function AboutUsPage({ params }: PageProps) {
  const { slug } = await params;
  const usernameParam = slug?.[0]; // If the URL is /about-us/omarhassan
  
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
