import { AboutUs } from "@/components/about/AboutUs";
import { aboutUsMetadata } from "@/lib/seo/about-metadata";

export const metadata = aboutUsMetadata;

export default function AboutUsPage() {
  return <AboutUs />;
}
