import { Check } from "lucide-react"


export const Pricing = () => {
    return (
        <div className="flex flex-col w-[95%] sm:w-[80%] mx-auto gap-2 mt-15">
            <p className="text-3xl text-muted font-semibold mx-auto">Choose Your Plan</p>
            <p className="text-muted-foreground mx-auto">Select the perfect plan for your dental care needs. All plans include secure access and bank-level encryption.</p>
            <div className="flex flex-wrap gap-3 my-10 justify-center">
                <div className="flex flex-col gap-1 bg-white rounded-lg w-90">
                    <p className="text-black mt-4 mx-4 font-bold">Free</p>
                    <p className="text-muted-foreground text-sm mx-4">Essential Dental Appointment Booking</p>
                    <p className="text-black text-2xl font-semibold mx-4 mt-3">$0</p>
                    <p className="text-muted-foreground text-xs mx-4 mt-2">Always Free</p>
                    <div className="border-t border-b border-muted-foreground my-5 flex flex-col gap-3 px-3 py-5">
                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Unlimited appointment booking</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Basic text chat support</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Appointment reminders</p>
                        </div>

                        <div className="invisible flex gap-3 items-center ">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Detailed health reports</p>
                        </div>
                    </div>

                    <button className="mx-3 flex justify-center items-center bg-amber-500 rounded-sm text-muted text-sm py-2 mb-5">
                        Switch to this plan
                    </button>

                </div>

                 <div className="flex flex-col gap-1 bg-white rounded-lg w-90">
                    <div className="flex justify-between mt-4 mx-4">
                    <p className="text-black font-bold">AI Basic</p>
                    <div className="px-3 py-1 rounded-sm bg-amber-500">
                        <p className="text-xs text-white">Active</p>
                    </div>
                    </div>
                    <p className="text-muted-foreground text-sm mx-4">AI Consultations + Appointment Booking</p>
                    <p className="text-black text-2xl font-semibold mx-4 mt-3">$9<span className="text-muted-foreground text-sm">/month</span></p>
                    <p className="text-muted-foreground text-xs mx-4 mt-2">Only billed monthly</p>
                    <div className="border-t border-b border-muted-foreground my-5 flex flex-col gap-3 px-3 py-5">
                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Everything in free </p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">10 AI voice calls per month</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">AI dental guidance</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Priority support</p>
                        </div>
                    </div>

                    <button className="invisible mx-3 flex justify-center items-center bg-amber-500 rounded-sm text-muted text-sm py-2 mb-3">
                        Switch to this plan
                    </button>

                </div>

                 <div className="flex flex-col gap-1 bg-white rounded-lg w-90">
                    <p className="text-black mt-4 mx-4 font-bold">AI Pro</p>
                    <p className="text-muted-foreground text-sm mx-4">Unlimited AI Consultations</p>
                    <p className="text-black text-2xl font-semibold mx-4 mt-3">$19<span className="text-muted-foreground text-sm">/month</span></p>
                    <p className="text-muted-foreground text-xs mx-4 mt-2">Only billed monthly</p>
                    <div className="border-t border-b border-muted-foreground my-5 flex flex-col gap-3 px-3 py-5">
                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Everything in basic</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Unlimited AI voice calls</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Personalized care plans</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Check size={18} className="text-muted-foreground" />
                            <p className="text-black font-light text-sm">Detailed health reports</p>
                        </div>
                    </div>

                    <button className="mx-3 flex justify-center items-center bg-amber-500 rounded-sm text-muted text-sm py-2 mb-5">
                        Switch to this plan
                    </button>

                </div>
            </div>
        </div>
    )
}

