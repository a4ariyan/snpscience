import { preload } from "react-dom";
import { Home } from "@/components/home/Home";
import { HERO_IMAGE } from "@/shared/home-content";

export default function HomePage() {
  preload(HERO_IMAGE, { as: "image" });

  return <Home />;
}
