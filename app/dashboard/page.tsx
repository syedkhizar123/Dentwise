import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Dashboard = async () => {
     const user = await currentUser()
        if(!user){
            redirect("/")
          }
  return (
    <div>
      Welcome To Dentwise Dashboard
    </div>
  )
}

export default Dashboard
