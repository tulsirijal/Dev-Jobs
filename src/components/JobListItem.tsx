import { Job } from "@prisma/client";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import {Banknote, Briefcase, Clock, Globe2, MapPin} from 'lucide-react';
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "./Badge";
interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    location,
    locationType,
    description,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItemProps) {
  return (
    <article className="flex  gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceholder}
        alt="company logo"
        height={100}
        width={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
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
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shirnk-0" />
            {formatDate(createdAt)}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>
            {type}
        </Badge>
            <span className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16}/>
                {formatDate(createdAt)}
            </span>
      </div>
    </article>
  );
}
