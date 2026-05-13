import { UserButton } from "@clerk/nextjs"
import { Calendar, Crown, Home, Menu, Mic, X } from "lucide-react"
import Image from "next/image"
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
                        <a href="#doctors">
                            <div className="flex gap-2 items-center text-muted">
                                <Home size={20} />
                                Doctors
                            </div>
                        </a>

                        <a href="#appointments">
                            <div className="flex gap-2 items-center text-muted">
                                <Calendar size={20} />
                                Appointments
                            </div>
                        </a>

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
                        <a href="#doctors">
                            <div className="flex gap-2 items-center text-muted">
                                <Home size={20} />
                                Doctors
                            </div>
                        </a>
                        <a href="#appointments">
                            <div className="flex gap-2 items-center text-muted">
                                <Calendar size={20} />
                                Appointments
                            </div>
                        </a>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="flex flex-col max-[380px]:hidden ">
                        <p className="text-white text-sm">{name}</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                    </div>

                    <UserButton />
                </div>
            </div>
        </>
    )
}

