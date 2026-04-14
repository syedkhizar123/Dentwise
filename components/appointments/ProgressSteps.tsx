import { ChevronRightIcon } from "lucide-react"

interface progressProps {
    activeStep?: number
}

export const ProgressSteps = ({ activeStep }: progressProps) => {

    const steps = ["Select Dentist", "Choose Time", "Confirm"]

    return (
        <div className="w-[95%] sm:w-[80%]  mx-auto flex flex-wrap gap-2 sm:gap-5 my-3">
            {steps.map((item, index) => {
                const currentStep = index + 1
                return (
                    <div key={index} className="flex gap-2 sm:gap-3 items-center flex-wrap">
                        <div className={`size-6 rounded-full flex justify-center items-center ${activeStep! >= currentStep ? "bg-primary" : "bg-muted-foreground"}`}>
                            <p className={`text-sm ${activeStep! >= currentStep ? "text-muted" : "text-muted/30"}`}>{currentStep}</p>
                        </div>
                        <p className={`text-sm sm:text-base ${activeStep! >= currentStep ? "text-muted" : "text-muted-foreground"}`}>{item}</p>
                        {currentStep !== 3 && (
                            <ChevronRightIcon size={15} className={`${activeStep! >= currentStep ? "text-muted" : "text-muted-foreground"}`} />
                        )}
                    </div >
                )
            })}

        </div>
    )
}

