import JobPage from "@/components/JobPage"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisima"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"

interface JobSlugProps {
    params:{slug:string}
}

const getJob = cache(async(slug:string)=>{
    const job = await prisma.job.findUnique({
        where:{
            slug:slug
        }
    })
    if(!job) {
        notFound();
    }
    return job;
})

export async function generateMetadata({params:{slug}}:JobSlugProps):Promise<Metadata> {
    const job = await getJob(slug);
    return {
        title:job.title
    }
}

export async function generateStaticParams(){
    const jobs = await prisma.job.findMany({
        where:{approved:true},
        select:{slug:true}
    });
    return jobs.map(({slug})=>slug);
}

export default async function Page({params:{slug}}:JobSlugProps) {
   const job = await getJob(slug);
   const {applicationUrl, applicationEmail} = job;
   const applicationLink = applicationEmail ? `mailto:${applicationEmail}` : applicationUrl;
   if(!applicationLink) {
        console.log("Job link or email isn't available.");
        notFound();
   }
  return (
    <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
        <JobPage job={job}/>
        <aside>
            <Button asChild>
                <a href={applicationLink}>Apply now</a>
            </Button>
        </aside>
    </main>
  )
}

