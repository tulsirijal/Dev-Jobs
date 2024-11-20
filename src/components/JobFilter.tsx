import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./ui/select";
import prisma from "@/lib/prisima";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { jobFilterSchema, JobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitBtn from "./FormSubmitBtn";

async function filterJobs(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());
  const {query,type,location,remote} = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(query && {query:query.trim()}),
    ...(type && {type}),
    ...(location && {location}),
    ...(remote && {remote: "true"})
  })
  redirect(`/?${searchParams.toString()}`)

}

interface JobFilterSidebarProps {
  defaultValues:JobFilterValues
}

export default async function JobFilter({defaultValues:{query,type,location,remote}}:JobFilterSidebarProps) {
  const locations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((location) =>
      location.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:max-w-[260px]">
      <form action={filterJobs} key={JSON.stringify({query,type,location,remote})}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="query">Search</Label>
            <Input id="query" name="query" placeholder="Title, Company, etc." defaultValue={query} />
          </div>

          <div className="flex flex-col gap-2 ">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue={type || ""}>
              <option value="">All Types</option>
              {jobTypes.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={location || ""}>
              <option value="">All Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2 ">
            <input
              id="remote"
              type="checkbox"
              name="remote"
              className="scale-123 accent-black"
              defaultChecked={remote}
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <FormSubmitBtn>
            Filter Jobs
          </FormSubmitBtn>
        </div>
      </form>
    </aside>
  );
}
