import { useEffect, useState } from "react"

export const useGetBackgrounds = (cookie : any) => {
    const [backgrounds, setBackgrounds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + cookie);

    var requestOptions: any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        fetch("http://api_taski.test/api/backgrounds", requestOptions)
            .then(response => response.json())
            .then(result => {
                setBackgrounds(result.data.backgrounds)
            })
            .catch(error => {
                console.log('error', error)
                setError(true)
            }).finally(() => {
                setLoading(false)
            });
    }, [])

    return { backgrounds, loading, error }

}
