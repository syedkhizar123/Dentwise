"use client"

import { Doctors } from "@/components/admin/Doctors"
import { Header } from "@/components/admin/Header"
import { Stats } from "@/components/admin/Stats"
import { Welcome } from "@/components/admin/Welcome"

const page = () => {
  return (
    <>
    <Header name="admin" email="admin@gmail.com" />
    <Welcome name="Admin" />
    <Stats />
    <Doctors />
    </>
  )
}

export default page