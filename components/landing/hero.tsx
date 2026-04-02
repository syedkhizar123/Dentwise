
export const Hero = () => {
    return (

        <section className="relative h-screen flex items-center overflow-hidden pt-20">
            {/* DARK BASE */}
            <div className="absolute inset-0 bg-[#111111]">
                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_80%)]"></div>
            </div>

            {/* GLOW ORBS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

            <div className="flex "></div>
        </section>
    )
}
