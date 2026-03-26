import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Bookings = async () => {
    const user = await currentUser()
    if (!user) {
        redirect("/")
    }
  
    return (
        <div>
            <h1>This is Bookings Page</h1>
        </div>
    )
}

export default Bookings
