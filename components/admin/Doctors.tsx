import { Edit, Mail, Phone, Plus, User } from "lucide-react"
import Image from "next/image"

export const Doctors = () => {
  return (
    <div className="w-[95%] sm:w-[80%] mx-auto border border-muted/10 rounded-md p-4">
        <div className="flex items-center justify-between w-full">
           
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <User className="text-primary" size={18} />
                    <p className="text-muted text-md">Doctors Management</p>
                </div>

                <p className="text-sm text-muted-foreground hidden sm:flex">Manage and oversee all doctors in your practice.</p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary">
                <Plus className="text-black" size={14} />
                <p className="text-sm text-black hidden sm:flex">Add Doctor</p>
            </button>
        </div>

        <div className="flex-col gap-2 w-full mt-5">

            <div className="w-full border border-muted/10 rounded-lg bg-muted-foreground/10 p-3 flex justify-between items-center">

                <div className="flex items-center gap-4">
                    <Image src={"./logo.png"} alt="Doctor Image" className="rounded-full" height={30} width={30}  />
                    
                    <div className="flex flex-col">
                        <p className="text-muted font-semibold">Dr. Jane Smith</p>
                        <div className="flex items-center gap-4">
                            <p className="text-muted-foreground text-sm">Root Canal Expert</p>
                            <div className="bg-muted-foreground/15 px-3 py-0.5">
                                <p className="uppercase text-sm text-muted-foreground">Female</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 mt-1">
                            <div className="flex items-center gap-1">
                                <Mail className="text-muted-foreground" size={12} />
                                <p className="text-xs text-muted-foreground">janesmith@gmail.com</p>
                            </div>

                            <div className="flex items-center gap-1">
                                <Phone className="text-muted-foreground" size={12} />
                                <p className="text-xs text-muted-foreground">(555) 654-321</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 ">
                    
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-primary">1</p>
                        <p className="text-muted-foreground text-sm">Appointments</p>
                    </div>

                    <div className="rounded-full px-3 py-1 bg-white">
                        <p className="text-black text-sm ">Active</p>
                    </div>

                    <button className="flex items-center justify-center gap-1 bg-muted-foreground/5 border border-muted/5 rounded-md px-3 py-1">
                        <Edit className="text-muted" size={12} />
                        <p className="text-muted text-sm">Edit</p>
                    </button>
                </div>

            </div>
        </div>
    </div>
  )
}

