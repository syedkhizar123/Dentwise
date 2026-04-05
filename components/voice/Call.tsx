import Image from "next/image"

interface CallProps {
    image : string,
    name: string
}

export const Call = ({ image, name }: CallProps) => {
    return (
        <div className="w-[95%] sm:w-[80%] mx-auto py-10 flex flex-col gap-3">
            <p className="text-muted text-3xl font-semibold mx-auto">Talk to Your<span className="text-primary text-3xl font-bold"> AI DENTAL ASSISTANT</span></p>
            <p className="text-muted-foreground mx-auto">Have a voice conversation with our AI assistant for dental advice and guidance</p>

            <div className="flex flex-col md:flex-row justify-center gap-3 items-center mt-5">

                <div className="flex flex-col justify-center items-center gap-2 border border-muted-foreground/20 rounded-lg py-20 w-full md:w-[48%]">
                    <div className="flex justify-center items-center p-3 rounded-full bg-primary/10">
                        <Image src="logo.png" alt="AI Dental Assistant" width={100} height={100} />
                    </div>
                    <p className="text-muted text-xl font-bold">Dentwise AI</p>
                    <p className="text-lg text-muted-foreground">Dental Assistant</p>
                    <div className="flex justify-center items-center gap-2 px-3 py-1 rounded-full border border-muted-foreground mt-2">
                        <div className="size-1.5 bg-muted-foreground rounded-full"></div>
                        <p className="text-muted-foreground text-xs">Waiting...</p>
                    </div>
                </div>

                 <div className="flex flex-col justify-center items-center gap-2 border border-muted-foreground/20 rounded-lg py-20 w-full md:w-[48%]">
               <div className="flex justify-center items-center p-0 rounded-full bg-primary/10">
                     <Image src={image} alt="User" className="rounded-full " width={124} height={124} />
               </div>
               <p className="text-muted text-xl font-bold">You</p>
               <p className="text-lg text-muted-foreground">{name}</p>
               <div className="flex justify-center items-center gap-2 px-3 py-1 rounded-full border border-muted-foreground mt-2">
                        <div className="size-1.5 bg-muted-foreground rounded-full"></div>
                        <p className="text-muted-foreground text-xs">Ready</p>
                    </div>
            </div>

            </div>
        </div>
    )
}

