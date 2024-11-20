import React from "react";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisima";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobResultProps {
  filterValues: JobFilterValues;
  page?:number
}

export default async function JobResult({
  filterValues, page=1
}: JobResultProps) {
  const { query, location, type, remote } = filterValues;
  const jobsPerPage = 6;
  const skipPage = (page - 1) * jobsPerPage;
  
  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? { OR: [
      { title: { search: searchString } },
      { companyName: { search: searchString } },
      { type: { search: searchString } },
      { locationType: { search: searchString } },
      {location:{search:searchString}}
    ] }
    : {};

  const where:Prisma.JobWhereInput = {
    AND:[
      searchFilter,
      type ? {type} : {},
      location ? {location}: {},
      remote ? {locationType:"Remote"}:{},
      {approved:true}
    ]
  }
  const jobsPromise = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take:jobsPerPage,
    skip:skipPage
  });
  const countPromise = prisma.job.count({where});
  const [jobs,totalPage] = await Promise.all([jobsPromise,countPromise])
  return (
    <div className=" grow space-y-4 flex flex-col ">
      {jobs.map((job, index) => {
        return <Link href={`/jobs/${job.slug}`} key={job.slug}><JobListItem key={job.slug} job={job} /></Link>;
      })}
      {jobs.length==0 && (
        <p className="text-center m-auto">No jobs found.</p>
      )}
      {
        jobs.length > 0 && <Pagination currentPage={page} totalPages={Math.ceil(totalPage / jobsPerPage)} filterValues={filterValues} />
      }
    </div>
  );
}

interface PaginationProps {
  currentPage:number,
  totalPages:number,
  filterValues: JobFilterValues
}

function Pagination({currentPage,totalPages,filterValues:{query,location,type,remote}}:PaginationProps){
  function generatePageLink(page:number){
    const searchParams = new URLSearchParams({
      ...(query && {query}),
      ...(type && {type}),
      ...(location && {location}),
      ...(remote && {remote:"true"}),
      page:page.toString()
    });
    return `/?${searchParams.toString()}`
  }
  return <div className="flex justify-between">
    <Link href={generatePageLink(currentPage - 1)} className={cn("flex items-center gap-2 font-semibold", currentPage <=1 && "invisible")}> <ArrowLeft size={16}/> Previous Page</Link>
    <Link href={generatePageLink(currentPage + 1)} className={cn("flex items-center gap-2 font-semibold",currentPage >=totalPages && "invisible")}>Next Page <ArrowRight size={16}/> </Link>
  </div>
}
