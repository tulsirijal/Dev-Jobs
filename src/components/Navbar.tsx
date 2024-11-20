import Link from "next/link";
import logo from '@/assets/logo.png';
import Image from "next/image";
import { Button } from "./ui/button";
export default function Navbar() {
  return (
    <header className="shadow-sm">
        <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
            <Link href='/' className="flex items-center gap-3">
                <Image src={logo} alt="logo" width={40} height={40} />
                <span className="font-bold text-xl tracking-tight">
                    Dev Jobs
                </span>
            </Link>
            <Button asChild>
                <Link href='/jobs/new'>Post a job</Link>
            </Button>
        </nav>
    </header>
  )
}
