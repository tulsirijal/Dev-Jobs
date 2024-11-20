import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required")
const numericString = requiredString.regex(/^\d+$/,"Must be a number")
const companyLogoSchema = z.custom<File | undefined>().
refine(file => !file || (file instanceof File && file.type.startsWith("image/")), "Must be an image file")
.refine(file => !file || file.size < 1024 * 1024 * 2, "file must be less than 2MB");

const applicationSchema = z.object({
    applicationEmail:z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl:z.string().max(100).url().optional().or(z.literal(""))
}).refine(data=>data.applicationEmail || data.applicationUrl, {
    message:"Email or Url is required",
    path:["applicationEmail"]
})

const locationSchema = z.object({
    locationType: requiredString.refine(value=>locationTypes.includes(value),"Invalid location types"),
    location:z.string().max(100).optional()
}).refine(value=>!value.locationType || value.locationType=="Remote" || value.location,{
    message:"Location is required for on-site or hybrid jobs",
    path:["location"]
})

export const createJobSchema = z.object({
    title: requiredString.max(100),
    type: requiredString.refine(value => jobTypes.includes(value), "Invalid Job Types"),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description:z.string().max(5000).optional(),
    salary:numericString.max(9,"Number cannot be larger than 9 digits"),

}).and(applicationSchema).and(locationSchema);

export type createJobValues = z.infer<typeof createJobSchema>

export const jobFilterSchema = z.object({
    query: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional()

})

export type JobFilterValues = z.infer<typeof jobFilterSchema>