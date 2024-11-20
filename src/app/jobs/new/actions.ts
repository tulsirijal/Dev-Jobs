"use server";

import { convertToSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from 'nanoid';
import { put } from '@vercel/blob';
import path from "path";
import prisma from "@/lib/prisima";
import { redirect } from "next/navigation";

export async function createJobPost(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const {
        title,
        type,
        locationType,
        location,
        description,
        companyName,
        companyLogo,
        applicationEmail,
        applicationUrl,
        salary

    } = createJobSchema.parse(values);

    const slug = `${convertToSlug(title)}-${nanoid(10)}`;
    let companyLogoUrl: string | undefined = undefined;

    if (companyLogo) {
        const blob = await put(`company_logos/${slug}${path.extname(companyLogo.name)}`, companyLogo, {
            access: 'public',
            addRandomSuffix: false
        });
        companyLogoUrl = blob.url;
    }
    await prisma.job.create({
        data:{
            slug,
            title:title.trim(),
            type,
            locationType,
            location,
            description:description?.trim(),
            companyName:companyName.trim(),
            companyLogoUrl,
            applicationEmail:applicationEmail?.trim(),
            applicationUrl:applicationUrl?.trim(),
            salary:parseInt(salary),
            
        }
    });
    redirect('/job-submitted');
}