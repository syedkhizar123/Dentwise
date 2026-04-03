import Image from "next/image"

export const Footer = () => {
  return (
    <>
    <div className="w-[95%] sm:w-[80%] mx-auto flex flex-col md:flex-row gap-15 max-w-250 border-b border-b-muted/10 items-start py-10 justify-center mb-10">
        <div className="w-full md:w-[30%] flex flex-col gap-5">
            <div className="flex gap-2 items-center">
                <Image src={"/logo.png"} alt="DentWise Logo" height={50} width={50} />
                <p className="text-white text-xl ">DentWise</p>
            </div>
            <p className="text-muted-foreground text-sm">AI-powered dental assisstance that actually helps </p>
        </div>

        <div className="w-full md:w-[70%] flex justify-between items-center">
            <div className="flex flex-col gap-5">
                <p className="text-white font-semibold">Product</p>
                <p className="text-muted-foreground text-sm">How it works</p>
                <p className="text-muted-foreground text-sm">Pricing</p>
                <p className="text-muted-foreground text-sm">FAQ</p>
            </div>

            <div className="flex flex-col gap-5">
                <p className="text-white font-semibold">Support</p>
                <p className="text-muted-foreground text-sm">Help center</p>
                <p className="text-muted-foreground text-sm">Contact us</p>
                <p className="text-muted-foreground text-sm">Status</p>
            </div>

            <div className="flex flex-col gap-5">
                <p className="text-white font-semibold">Legal</p>
                <p className="text-muted-foreground text-sm">Privacy</p>
                <p className="text-muted-foreground text-sm">Terms</p>
                <p className="text-muted-foreground text-sm">Security</p>
            </div>
        </div>
    </div>  
    <div className="w-[95%] sm:w-[80%] mx-auto flex justify-center items-center mb-15">
        <p className="text-muted-foreground text-sm">© 2023 DentWise. Built for real people with real dental questions.</p>
    </div>
    </>
  )
}

