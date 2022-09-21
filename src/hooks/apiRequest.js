import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

/**
 *
 * @param {string} url
 */

const useApiRequest = (url , method, body) => {
    const [data, setData] = useState({})
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const checkType = async (gotdata) => {
            setData({
                message: gotdata.message,
                data: gotdata.data,
                error: gotdata.error
            });
            setTotal(gotdata.total)
    }

    const fetchData = useCallback(
        async () => {
          setLoading(true)
          try {
            const response = await axios({
              method: method,
              url,
              data: body
            })
            checkType(response.data);
            setLoading(false)
          } catch (error) {
            console.error('Error =>', error)
            setLoading(false)
          }
        },[url,method,body],
        )

        useEffect(() => {
            fetchData()
        }, [fetchData])

        return { data, setData, total, loading, setLoading, fetchData }
}
export default useApiRequest