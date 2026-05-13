import { Settings } from "lucide-react"

interface WelcomeProps {
    name?: string
}

export const Welcome = ({ name }: WelcomeProps) => {
    return (
        <div className="w-[95%] sm:w-[80%] mx-auto flex justify-between min-gap-2 my-5 sm:my-10 bg-linear-to-br from-primary/10 via-primary/5 to-card rounded-3xl p-8 border border-primary/20 ">
            <div className="flex flex-col gap-3 items-start">

                <div className="flex items-center justify-between border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                    <div className="bg-amber-500 size-2 rounded-full" ></div>
                    <p className="text-xs text-amber-500">Admin Dashboard</p>
                </div>

                <p className="text-xl sm:text-3xl text-white font-bold mt-2">Welcome Back, {name}!</p>

                <p className="text-muted-foreground">Manage doctors, oversee appointments, and monitor your dental practice performance</p>
            </div>

            <div className="hidden md:flex justify-between items-center">
                <div className="flex justify-center items-center size-30 rounded-full bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                    <Settings className="text-amber-500" size={70}  />
                </div>
            </div>

        </div>
    )
}

