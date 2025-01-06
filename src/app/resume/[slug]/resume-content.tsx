// src/app/resume/[slug]/resume-content.tsx
'use client'

import { Icon } from '@iconify/react';
import type { ResumeData } from './types';

interface ResumeContentProps {
  data: ResumeData;
}

export function ResumeContent({ data }: ResumeContentProps) {
  return (
    <div className="p-4 print:p-0 print:m-0" id="resume">
      {/* Basic Info */}
      <div className="relative mt-0 flex items-center gap-x-4 py-6">
        {data.basics.picture && (
          <img
            src={data.basics.picture}
            alt={data.basics.name}
            className="h-28 w-28 flex-none rounded-lg bg-gray-800 object-cover"
          />
        )}
        <div className="text-sm leading-6">
          <p className="font-semibold text-2xl text-zinc-800 dark:text-zinc-100">
            {data.basics.name}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{data.basics.email}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{data.basics.phone}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {data.basics.location.full_address}
          </p>
          {/* Social Profiles with Iconify icons */}
          <div className="my-3 space-x-3">
            {data.basics.profiles.map((profile) => (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                aria-label={profile.network}
              >
                <Icon icon={profile.icon} className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        {data.basics.summary}
      </p>

      {/* Professional Synopsis */}
      <h2 className="text-2xl font-semibold spotlight text-gray-600 mt-4">
        Professional Synopsis
      </h2>
      <ul className="list-disc text-sm text-zinc-600 dark:text-zinc-400 pl-6 mt-2">
        {data.professionalSynopsis.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      {/* Core Competencies */}
      <h2 className="text-2xl font-semibold spotlight text-gray-600 mt-4">
        Core Competencies
      </h2>
      <div className="mt-2 grid grid-cols-2 gap-x-2 md:grid-cols-4 md:gap-y-0">
        {data.coreCompetencies.map((item) => (
          <div key={item} className="group relative">
            <h3 className="mt-1 text-md font-semibold text-zinc-400">
              {item}
            </h3>
          </div>
        ))}
      </div>

      {/* Technical Competencies with Iconify icons */}
      <h2 className="text-2xl font-semibold spotlight text-gray-600 mt-4">
        Technical Competencies
      </h2>
      <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.technicalCompetencies.map((item) => (
          <div key={item.name} className="group relative">
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Icon 
                icon={item.icon} 
                className="h-6 w-6" 
                style={{ color: getIconColor(item.name) }}
              />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold spotlight text-gray-600 mt-4">
          Work Experience
        </h2>
        {data.work.map((job) => (
          <div key={job.company} className="mt-4 pb-2">
            <h3 className="font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              {job.company} - {job.position}
            </h3>
            <p className="font-semibold tracking-tight text-zinc-400">
              {job.location}
            </p>
            <p className="text-xs mt-1 tracking-tight text-zinc-400 flex items-center">
              <Icon icon="icon-park-twotone:calendar-dot" className="w-4 h-4 mr-1" />
              {new Date(job.startDate).toLocaleDateString()} -{" "}
              {job.endDate
                ? new Date(job.endDate).toLocaleDateString()
                : "Present"}
            </p>
            <p className="mt-2 tracking-tight text-sm text-zinc-600 dark:text-zinc-400">
              {job.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to get icon colors (optional)
function getIconColor(technology: string): string {
  const colorMap: Record<string, string> = {
    Python: '#3776AB',
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    React: '#61DAFB',
    // Add more colors as needed
  };
  return colorMap[technology] || '#666666';
}