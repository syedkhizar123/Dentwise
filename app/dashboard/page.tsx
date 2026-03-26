import DashboardComp from "@/components/dashboard"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const user = await currentUser()
    if (!user) {
        redirect("/")
    }
  
    return (
       <DashboardComp />
    )
}

export default Dashboard
