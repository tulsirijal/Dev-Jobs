import JobFilter from "@/components/JobFilter";
import JobListItem from "@/components/JobListItem";
import JobResult from "@/components/jobResult";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisima";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  searchParams:{
    query?:string,
    location?:string,
    type?:string,
    remote?:string,
    page?:string
  }
}

function getTitle({location,type,remote,query}:JobFilterValues){
  const titlePrefix = query ? `${query} jobs` : type ? `${type} developer jobs` : remote ? `Remote developer jobs` : "All developer jobs";
  const titleSuffix = location ? ` in ${location}` : "";
  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({searchParams:{query,location,type,remote,page}}:PageProps):Metadata{
  return {
    title:`${getTitle({
      query,location,type,remote:remote==="true"
    })} | Dev Jobs`
  }
}
export default async function Home({searchParams:{query,location,type,remote,page}}:PageProps) {
  const filterValues:JobFilterValues  = {
    query,
    location,
    type,
    remote:remote==="true"
  }
  return (
    <main className="max-w-5xl m-auto my-10 px-4 space-y-10  ">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilter defaultValues={filterValues} />
        <JobResult filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
    </main>
  );
}
