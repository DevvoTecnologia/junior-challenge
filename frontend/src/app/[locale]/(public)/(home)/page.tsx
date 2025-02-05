//
import { headers } from "next/headers"

//
import { HomePage } from "@/ui/pages/HomePage"

async function getServerSideData() {
  const headersList = await  headers()
  const host = headersList.get("host")

  try {
      const res = await fetch(`http://${host}/api/get-rings`, {
          cache: "no-cache"
      })

      if (!res.ok) {
          throw new Error("Failed to fetch data")
      }

      const data = await res.json()
      return data
      
  } catch (error) {
      console.error("Error fetching server-side data:", error)
      return null
  }
  
}

export default async function Home() {
  const ringsData = await getServerSideData()

  return <HomePage ringsData={ringsData} />
}
