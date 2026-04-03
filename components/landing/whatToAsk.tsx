import { MessageCircle, MessageSquareIcon } from "lucide-react"
import Image from "next/image"

export const WhatToAsk = () => {
    return (
        <div id="about" className="w-[95%] sm:w-[80%] mx-auto pb-10 flex flex-col gap-5 items-center justify-center pt-10">
            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                <MessageCircle size={16} className="text-amber-500" />
                <p className="text-xs text-amber-500">AI-Powered Conversations</p>
            </div>

            <div className="flex flex-col gap-1 mx-auto">
                <p className="text-4xl sm:text-5xl font-bold text-white mx-auto text-center">Ask about</p>
                <p className="text-4xl sm:text-5xl font-bold text-primary mx-auto text-center">anything dental</p>
            </div>

            <div className="mx-auto flex justify-center items-center w-full max-w-150">
                <p className="text-center text-muted-foreground text-md"> From simple questions to complex concerns, our AI delivers expert-level guidance trained on thousands of real dental cases</p>
            </div>

            <div className="flex justify-between w-full mt-10">
                <div className="w-full md:w-[65%] xl:w-[50%] flex flex-col gap-5 ">
                    <p className="text-white font-semibold text-center sm:text-start">Common questions our AI answers:</p>
                    <div className="p-8 rounded-2xl flex gap-3 border border-white/5 sm:w-max ">
                        <div className="hidden sm:flex items-center justify-center h-min p-5 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10">
                            <MessageSquareIcon size={20} className="text-amber-500" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="w-full sm:w-100 px-3 py-5 rounded-lg border bg-primary/5 border-primary/10">
                                <p className="text-primary font-semibold text-sm">"My tooth hurts when I bite down"</p>
                            </div>

                            <div className="flex flex-col gap-3 px-3 py-5 w-full sm:w-100 rounded-lg bg-muted/5 ">
                                <p className="text-muted-foreground text-sm">
                                    Get immediate advice on pain management, possible causes, and when to see a dentist urgently
                                </p>
                                <div className="flex self-start gap-3">
                                    <div className="flex items-center justify-between mx-auto rounded-full px-3 py-1 gap-2 bg-primary/10">
                                        <p className="text-xs text-amber-500">Instant Response</p>
                                    </div>

                                    <div className="flex items-center justify-between mx-auto rounded-full px-3 py-1 gap-2 bg-primary/10">
                                        <p className="text-xs text-amber-500">Pain Relief </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl flex gap-3 border border-white/5 sm:w-max">
                        <div className="hidden sm:flex items-center justify-center h-min p-5 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10">
                            <MessageSquareIcon size={20} className="text-amber-500" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="w-full sm:w-100 px-3 py-5 rounded-lg border bg-primary/5 border-primary/10">
                                <p className="text-primary font-semibold text-sm">"How much does teeth whitening cost?"</p>
                            </div>

                            <div className="flex flex-col gap-3 px-3 py-5 w-full sm:w-100 rounded-lg bg-muted/5 ">
                                <p className="text-muted-foreground text-sm">
                                    Compare treatment options, pricing ranges, and find the best whitening solution for your budget
                                </p>
                                <div className="flex self-start gap-3">
                                    <div className="flex items-center justify-between mx-auto rounded-full px-3 py-1 gap-2 bg-primary/10">
                                        <p className="text-xs text-amber-500">Cost Analysis</p>
                                    </div>

                                    <div className="flex items-center justify-between mx-auto rounded-full px-3 py-1 gap-2 bg-primary/10">
                                        <p className="text-xs text-amber-500">Treatment Options</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl flex gap-3 border border-white/5 sm:w-max">
                        <div className="hidden sm:flex items-center justify-center h-min p-5 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10">
                            <MessageSquareIcon size={20} className="text-amber-500" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="w-full sm:w-100 px-3 py-5 rounded-lg border bg-primary/5 border-primary/10">
                                <p className="text-primary font-semibold text-sm">"When should I replace my filling?"</p>
                            </div>

                            <div className="flex flex-col gap-3 px-3 py-5 w-full sm:w-100 rounded-lg bg-muted/5 ">
                                <p className="text-muted-foreground text-sm">
                                    Learn about filling lifespan, warning signs of wear, and replacement timing guidance
                                </p>
                                <div className="flex self-start gap-3">
                                    <div className="flex items-center justify-between mx-auto rounded-full px-3 py-1 gap-2 bg-primary/10">
                                        <p className="text-xs text-amber-500">Preventive Care</p>
                                    </div>

                                    <div className="flex items-center justify-between mx-auto rounded-full px-3 py-1 gap-2 bg-primary/10">
                                        <p className="text-xs text-amber-500">Maintenance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full hidden lg:flex md:w-[35%] xl:w-[50%]  justify-center items-center">
                    <Image src="/confused.png" alt="Confused Image" width={400} height={400} className="min-w-100 min-h-100" />

                </div>
            </div>
        </div>
    )
}

