import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict} from 'date-fns'
import {UserResource} from '@clerk/types';
import {User} from '@clerk/nextjs/server'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(currency:number){
  return Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD"
  }).format(currency);
}


export function formatDate(from:Date){
  return formatDistanceToNowStrict(from,{
    addSuffix:true
  })
}

export function convertToSlug(string:string){
  return string.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"")
}

export function isAdmin(user:UserResource | User){
  return user.publicMetadata?.role == "admin";
}