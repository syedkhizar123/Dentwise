import { Calendar, Mic, Shield } from "lucide-react"


export const FeatureCards = () => {
  return (
    <div className="w-[95%] sm:w-[80%] mx-auto flex flex-col md:flex-row gap-5 md:gap-0 justify-between py-10">

      <div className="w-full md:w-[48%]  bg-primary/5 shadow-sm border border-primary/30 rounded-2xl p-6 flex flex-col gap-2 items-start ">

        <div className="flex gap-3 items-center">
          <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
            <Mic size={20} className="text-amber-500" />
          </div>

          <p className="text-white font-semibold ">How to use</p>
        </div>

        <p className="text-muted-foreground text-sm my-2">Simple steps to get started with our voice assistant.</p>

        <div className="flex gap-3 items-center mt-3">
          <div className="size-2 bg-amber-500 rounded-full"></div>
          <p className="text-muted/80 text-sm">Click the microphone button to start talking</p>
        </div>

        <div className="flex gap-3 items-center mt-3">
          <div className="size-2 bg-amber-500 rounded-full"></div>
          <p className="text-muted/80 text-sm">Ask questions about dental health and treatments</p>
        </div>

        <div className="flex gap-3 items-center mt-3">
          <div className="size-2 bg-amber-500 rounded-full"></div>
          <p className="text-muted/80 text-sm">Get instant voice responses from the AI</p>
        </div>

        <div className="flex gap-3 items-center mt-3">
          <div className="size-2 bg-amber-500 rounded-full"></div>
          <p className="text-muted/80 text-sm">View conversation transcript in real time</p>
        </div>
      </div>

      <div className="w-full md:w-[48%]  shadow-sm border border-muted-foreground/25 rounded-2xl p-6 flex flex-col gap-2 items-start ">

        <div className="flex gap-3 items-center">
          <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
            <Shield size={20} className="text-amber-500" />
          </div>

          <p className="text-white font-semibold ">Features</p>
        </div>

        <p className="text-muted-foreground text-sm my-2">Advance capabilities for dental care</p>

        <div className="flex gap-3 items-center mt-3 w-full p-3 rounded-md bg-muted-foreground/20">
          <div className="flex justify-center items-center p-2 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
            <Mic size={16} className="text-amber-500" />
          </div>
          <p className="text-muted/80 text-sm">Real-time Voice Recognition</p>
        </div>

        <div className="flex gap-3 items-center mt-3 w-full p-3 rounded-md bg-muted-foreground/20">
          <div className="flex justify-center items-center p-2 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
            <Shield size={16} className="text-amber-500" />
          </div>
          <p className="text-muted/80 text-sm">AI-Powered Responses</p>
        </div>

        <div className="flex gap-3 items-center mt-3  w-full p-3 rounded-md bg-muted-foreground/20">
          <div className="flex justify-center items-center p-2 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
            <Calendar size={16} className="text-amber-500" />
          </div>
          <p className="text-muted/80 text-sm">Conversation History</p>
        </div>


      </div>

    </div>
  )
}

