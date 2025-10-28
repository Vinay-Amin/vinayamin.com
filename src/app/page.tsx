import { HomeClient } from "@/components/HomeClient";
import { getCmsData } from "@/lib/cms/storage";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getCmsData();

  return (
    <HomeClient
      profile={data.profile}
      highlights={data.highlights}
      experiences={data.experiences}
      projects={data.projects}
      impactStats={data.impactStats}
      testimonials={data.testimonials}
    />
  );
}
