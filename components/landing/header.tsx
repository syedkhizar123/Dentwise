import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Image from "next/image"

export const Header = () => {
    return (
        <div className="w-[95%] sm:w-[85%] mx-auto flex justify-between items-center py-4">

            <div className="flex gap-0 sm:gap-2 items-center">
                <Image src={"/logo.png"} alt="DentWise Logo" height={50} width={50} />
                <p className="text-white text-md sm:text-xl max-[365px]:hidden">DentWise</p>
            </div>

            <div className="hidden min-[800px]:flex max-[820px]:gap-5 min-[820px]:gap-10 items-center">
                <a href="#howitworks">
                    <p className="text-muted-foreground text-md">How it works</p>
                </a>
                <a href="#pricing">
                    <p className="text-muted-foreground text-md">Pricing</p>
                </a>
                <a href="#about">
                    <p className="text-muted-foreground text-md">About</p>
                </a>
            </div>

            <div className="flex gap-3 items-center">
                <SignInButton mode="modal">
                    <button className="rounded-sm sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2 ">
                        <p className="text-sm sm:text-base text-white">Login</p>
                    </button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button className="bg-primary rounded-sm sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2 ">
                        <p className="text-sm sm:text-base text-black">Sign Up</p>
                    </button>
                </SignUpButton>

            </div>
           
        </div>
    )
}

