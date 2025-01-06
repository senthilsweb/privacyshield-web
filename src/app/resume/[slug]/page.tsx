// src/app/resume/[slug]/page.tsx
import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { generateMetadata as baseGenerateMetadata } from "@/lib/metadata";
import { ResumeContent } from "./resume-content";
import { DownloadButton } from "./download-button";
import type { ResumeData } from "./types";

const RESUME_PATH = path.join(process.cwd(), "src/content/resumes");

async function getResumeData(slug: string): Promise<ResumeData | null> {
  try {
    const filePath = path.join(RESUME_PATH, `${slug}.json`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading resume:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getResumeData(params.slug);
  
  if (!data) {
    return baseGenerateMetadata({
      title: 'Resume Not Found',
      description: 'The requested resume could not be found'
    });
  }

  return baseGenerateMetadata({
    title: `Resume of ${data.basics.name}`,
    description: data.basics.summary,
    image: data.basics.picture,
    url: `/resume/${params.slug}`,
    keywords: [...data.coreCompetencies, ...data.technicalCompetencies.map(tc => tc.name)]
  });
}

export async function generateStaticParams() {
  try {
    const files = fs.readdirSync(RESUME_PATH);
    return files
      .filter((filename) => filename.endsWith(".json"))
      .map((filename) => ({
        slug: filename.replace(".json", ""),
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ResumePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getResumeData(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] dark:text-gray-100">
      <MaxWidthWrapper>
        <div className="border-b mt-4 border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-slate-600 pl-4 sm:pl-0">Resume</h2>
          <div className="mt-3 flex sm:ml-4 sm:mt-0">
            <DownloadButton name={data.basics.name} />
          </div>
        </div>
        <ResumeContent data={data} />
      </MaxWidthWrapper>
    </div>
  );
}