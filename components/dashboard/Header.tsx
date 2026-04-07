import { UserButton } from "@clerk/nextjs"
import { Calendar, Crown, Home, Menu, Mic } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface HeaderProps {
    name?: string
    email?: string
}

export const Header = ({ name, email }: HeaderProps) => {

    const pathname = usePathname()

    return (
        <div className="w-[95%] mx-auto flex justify-between items-center py-4">
            <div className="flex gap-5 items-center">
                <div className="flex items-center">
                    <button>
                        <Menu size={25} className="text-muted md:hidden" />
                    </button>
                    <Image src={'/logo.png'} alt="DentWise Logo" width={50} height={50} />
                </div>
                <div className="hidden gap-4 items-center md:flex">
                    <Link className={`text-sm transition-colors ${pathname === "/dashboard" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="dashboard">
                        <div className="flex gap-2 items-center">
                            <Home size={20}  />
                            Dashboard
                        </div>
                    </Link>
                    <Link className={`text-sm transition-colors ${pathname === "/appointments" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="appointments">
                        <div className="flex gap-2 items-center">
                            <Calendar size={20}  />
                            Appointments
                        </div>
                    </Link>
                   <Link className={`text-sm transition-colors ${pathname === "/voice" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="voice">
                        <div className="flex gap-2 items-center">
                            <Mic size={20}  />
                            Voice
                        </div>
                    </Link>
                   <Link className={`text-sm transition-colors ${pathname === "/pro" ? "text-muted" : "text-muted-foreground hover:text-muted/55"}`} href="pro">
                        <div className="flex gap-2 items-center">
                            <Crown size={20}  />
                            Pro
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex gap-3 items-center">
                <div className="flex flex-col max-[380px]:hidden ">
                    <p className="text-white text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                </div>
                {/* <UserButton >
                    <button>
                        <Image src={avatar!} className="rounded-full " alt="User Avatar" width={40} height={40} />
                    </button>
                </UserButton> */}
                <UserButton />
            </div>
        </div>
    )
}

