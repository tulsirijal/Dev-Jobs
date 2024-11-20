"use client"
import FormSubmitBtn from "@/components/FormSubmitBtn"
import { Job } from "@prisma/client"
import { useFormState } from "react-dom"
import { approveJobs, deleteJob } from "../../actions"

interface AdminSideBarProps {
    job:Job
}

export default function AdminSideBar({job}:AdminSideBarProps) {
  return (
    <aside className="w-[200px] flex flex-none flex-row md:flex-col items-center gap-2 md:items-stretch ">
        {
            job?.approved ? <p className="text-center text-lg font-bold text-green-500">Approved</p> : <ApproveJobsBtn jobId={job.id}/>
        }
        <DeleteJobsBtn jobId={job.id}/>
        
    </aside>
  )
}

interface ApproveJobsBtnProps {
    jobId:number
}
function ApproveJobsBtn({jobId}:ApproveJobsBtnProps){
    const [formState,formAction] = useFormState(approveJobs,undefined);

    return <form action={formAction} className="space-y-1">
        <input  hidden value={jobId} name="jobId" />
        
        <FormSubmitBtn className="w-full bg-green-500 hover:bg-green-500">
            Approve
        </FormSubmitBtn>
        {formState?.error && <p className="text-sm text-red-600">{formState.error}</p>}
    </form>
}
function DeleteJobsBtn({jobId}:ApproveJobsBtnProps){
    const [formState,formAction] = useFormState(deleteJob,undefined);

    return <form action={formAction} className="space-y-1">
        <input  hidden value={jobId} name="jobId" />
        
        <FormSubmitBtn className="w-full bg-red-500 hover:bg-red-500">
           Delete
        </FormSubmitBtn>
        {formState?.error && <p className="text-sm text-red-600">{formState.error}</p>}
    </form>
}

