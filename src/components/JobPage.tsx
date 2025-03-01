import { formatCurrency } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MarkDown from "./MarkDown";

interface JobPagePros {
  job: Job;
}

export default function JobPage({
  job: {
    title,
    type,
    locationType,
    location,
    description,
    companyName,
    companyLogoUrl,
    applicationUrl,
    salary,
  },
}: JobPagePros) {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-blue-400 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shirnk-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shirnk-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shirnk-0" />
              {location || "World Wide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shirnk-0" />
              {formatCurrency(salary)}
            </p>
          </div>
        </div>
      </div>
      <div>
        {description && <MarkDown>{description}</MarkDown>}
      </div>
    </section>
  );
}
