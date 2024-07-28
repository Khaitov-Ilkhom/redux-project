import { useEffect, useState } from 'react'
import axios from "../api/Index.jsx"

const useFetch = (url, trigger) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const res = await axios(url)
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading(false)
      }

    }
    loadData();
  }, [url, trigger])

  return [ data, loading ]
}

export  { useFetch }