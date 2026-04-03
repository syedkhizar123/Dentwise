import { CheckCircleIcon, ZapIcon } from "lucide-react"

export const Pricing = () => {
    return (
        <section id="pricing" className="relative flex items-start overflow-hidden my-10 py-5">
            {/* DARK BASE */}
            <div className="absolute inset-0 bg-[#111111]">
                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[linear-gradient(to_bottom,#000_30%,transparent_80%)]"></div>
            </div>

            <div className="relative z-10 w-[90%] sm:w-[80%] mx-auto flex items-center justify-between flex-col gap-5">
                <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                    <ZapIcon size={16} className="text-amber-500" />
                    <p className="text-xs text-amber-500">Simple Process</p>
                </div>

                <div className="flex flex-col gap-1 mx-auto">
                    <p className="text-4xl sm:text-5xl font-bold text-white mx-auto text-center">Three steps to</p>
                    <p className="text-4xl sm:text-5xl font-bold text-primary mx-auto text-center">better dental health</p>
                </div>

                <div className="mx-auto flex justify-center items-center w-full max-w-150">
                    <p className="text-center text-muted-foreground text-md">Our streamlined process makes dental care accessible, convenient, and stress free for everyone.</p>
                </div>

                <div className="flex flex-col min-[1100px]:flex-row gap-8 min-[1100px]:gap-3 justify-center items-start">
                    <div className="p-8 min-[1100px]:w-[33%] max-w-85 rounded-3xl flex flex-col justify-start items-start gap-2 relative bg-linear-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                        <p className="text-white font-bold text-md text-start">Free</p>
                        <div className="flex justify-start items-center">
                            <p className="text-white text-2xl font-bold">$0</p>
                            <p className="text-muted-foreground text-sm">/month</p>
                        </div>
                        <p className="text-muted-foreground text-sm">Essential dental appointment booking</p>
                        <button className="rounded-full w-full py-2 bg-muted/5 my-2">
                            <p className="text-sm text-white">Get Started Free</p>
                        </button>

                        <div className="flex flex-col gap-5 mt-5">
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Unlimited appointment booking</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Find dentists in your area</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Basic text chat support</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Appointment reminders </p>
                            </div>
                        </div>

                    </div>

                     <div className="p-8 min-[1100px]:w-[33%] max-w-85 rounded-3xl flex flex-col justify-start items-start gap-2 relative bg-linear-to-br from-card/90 to-card/60 backdrop-blur-xl border border-primary/30 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                     <div className="absolute px-5 py-2 rounded-full bg-primary text-black font-bold text-sm -top-3 left-1/2 -translate-x-1/2">
                        <p>Most Popular</p>
                     </div>
                        <p className="text-white font-bold text-md text-start">AI Basic</p>
                        <div className="flex justify-start items-center">
                            <p className="text-primary text-2xl font-bold">$9</p>
                            <p className="text-muted-foreground text-sm">/month</p>
                        </div>
                        <p className="text-muted-foreground text-sm">AI consultations + appointment booking</p>
                        <button className="rounded-full w-full py-2 bg-primary my-2">
                            <p className="text-sm text-black">Start AI Basic</p>
                        </button>

                        <div className="flex flex-col gap-5 mt-5">
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Everything in free</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">10 AI voice calls per month</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">AI dental guidance and advice</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Symptom assessment </p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Priority support </p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Call history and recordings </p>
                            </div>
                        </div>

                    </div>

                     <div className="p-8 min-[1100px]:w-[33%] max-w-85 rounded-3xl flex flex-col justify-start items-start gap-2 relative bg-linear-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                        <p className="text-white font-bold text-md text-start">AI Pro</p>
                        <div className="flex justify-start items-center">
                            <p className="text-white text-2xl font-bold">$19</p>
                            <p className="text-muted-foreground text-sm">/month</p>
                        </div>
                        <p className="text-muted-foreground text-sm">Unlimited AI consultations</p>
                        <button className="rounded-full w-full py-2 bg-muted/5 my-2">
                            <p className="text-sm text-white">Upgrade to AI Pro</p>
                        </button>

                        <div className="flex flex-col gap-5 mt-5">
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Everything in AI Basic</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Unlimited AI voice calls</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Advanced AI dental analysis</p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Personalized care plans </p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">24/7 priority AI support </p>
                            </div>
                            <div className="flex gap-3 ">
                                <CheckCircleIcon size={16} className="text-primary" />
                                <p className="text-muted text-sm">Detailed health reports </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </section>

    )
}

