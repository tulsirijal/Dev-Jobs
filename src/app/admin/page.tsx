import JobListItem from "@/components/JobListItem"
import H1 from "@/components/ui/h1"
import prisma from "@/lib/prisima"
import Link from "next/link"


export default async function Page() {
    const unapprovedJobs = await prisma.job.findMany({
        where:{
            approved:false
        }
    })
  return (
    <main className="max-w-5xl m-auto space-y-10 px-3 my-10">
        <H1 className="text-cente">Admin Dashboard</H1>
        <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-black">Unapproved Jobs: </h2>
            {
                unapprovedJobs.map((job)=>{
                    return <Link href={`/admin/jobs/${job.slug}`} key={job.slug}><JobListItem key={job.slug} job={job} /></Link>;
                })
            }
            {
                unapprovedJobs.length===0 && <p className="text-sm font-medium text-muted-foreground">No unapproved jobs in the dashboard</p>
            }
        </section>
    </main>
  )
}

