import { UserButton } from "@clerk/nextjs"
import { Calendar, Crown, Home, Menu, Mic, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface HeaderProps {
    name?: string
    email?: string
}

export const Header = ({ name, email }: HeaderProps) => {

    const pathname = usePathname()
    const [navbarOpen, setNavbarOpen] = useState(false)

    useEffect(() => {
    if (navbarOpen) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }

    return () => {
        document.body.style.overflow = "auto"
    }
}, [navbarOpen])

    return (
        <>
            {navbarOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl h-screen w-screen p-4">

                    <button
                        onClick={() => setNavbarOpen(false)}
                        className="absolute top-5 right-5 text-white"
                    >
                        <X size={30} />
                    </button>


                    <div className="h-screen w-full flex flex-col items-center justify-center text-white text-xl gap-5">
                        <Link className={`text-sm transition-colors ${pathname === "/dashboard" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="dashboard">
                            <div className="flex gap-2 items-center">
                                <Home size={20} />
                                Dashboard
                            </div>
                        </Link>
                        <Link className={`text-sm transition-colors ${pathname === "/appointments" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="appointments">
                            <div className="flex gap-2 items-center">
                                <Calendar size={20} />
                                Appointments
                            </div>
                        </Link>
                        <Link className={`text-sm transition-colors ${pathname === "/voice" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="voice">
                            <div className="flex gap-2 items-center">
                                <Mic size={20} />
                                Voice
                            </div>
                        </Link>
                        <Link className={`text-sm transition-colors ${pathname === "/pro" ? "text-muted" : "text-muted-foreground hover:text-muted/55"}`} href="pro">
                            <div className="flex gap-2 items-center">
                                <Crown size={20} />
                                Pro
                            </div>
                        </Link>
                    </div>

                </div>
            )}
            <div className="w-[95%] mx-auto flex justify-between items-center py-4">
                <div className="flex gap-5 items-center">
                    <div className="flex items-center">

                        <button onClick={() => setNavbarOpen(true)}>
                            <Menu size={25} className={`text-muted md:hidden ${navbarOpen && "hidden"}`} />
                        </button>
                        <Image src={'/logo.png'} alt="DentWise Logo" width={50} height={50} />
                    </div>
                    <div className="hidden gap-4 items-center md:flex">
                        <Link className={`text-sm transition-colors ${pathname === "/dashboard" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="dashboard">
                            <div className="flex gap-2 items-center">
                                <Home size={20} />
                                Dashboard
                            </div>
                        </Link>
                        <Link className={`text-sm transition-colors ${pathname === "/appointments" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="appointments">
                            <div className="flex gap-2 items-center">
                                <Calendar size={20} />
                                Appointments
                            </div>
                        </Link>
                        <Link className={`text-sm transition-colors ${pathname === "/voice" ? "text-muted " : "text-muted-foreground hover:text-muted/55"}`} href="voice">
                            <div className="flex gap-2 items-center">
                                <Mic size={20} />
                                Voice
                            </div>
                        </Link>
                        <Link className={`text-sm transition-colors ${pathname === "/pro" ? "text-muted" : "text-muted-foreground hover:text-muted/55"}`} href="pro">
                            <div className="flex gap-2 items-center">
                                <Crown size={20} />
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
        </>
    )
}

