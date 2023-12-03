import {useEffect, useState} from "react";
import {buildIndex} from "./synchronous_autocomplete";
import normalize from 'normalize-for-search'
import {createAutocomplete} from "./autocomplete";

const fetchFragment = async (offset) => {
    return fetch(`https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1/stations?offset=${offset}&limit=100`, {
        headers: {
            'DB-Client-Id': '24aacca9795ac08c87e5e0f72e3afdf1',
            'DB-Api-Key': '488da4ba3b6c584113723e57b139bb48'
        },
        cache: "no-store"
    })
        .then(res => {
            if (!res.ok) {
                const err = new Error('non-2xx response')
                err.statusCode = res.status
                throw err
            }
            return res.json()
        }).then(jsonData => {
            let tmpData = []
            tmpData.push(jsonData.stations)
            return tmpData[0]
        })
}

const tokenize = str => normalize(str).replace(/[^\w\s]/g, '').split(/\s+/g)

const DB = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        let offset = 0
        let size = 0
        let tmp = []
        do {
            let tmpData = await fetchFragment(offset)
            tmpData.forEach(item => tmp.push(item))
            size = tmpData.length
            offset += size
        } while (size === 100)
        console.log(tmp)
        setData(tmp)
    }

    const index = buildIndex(tokenize, data)
    const autocomplete = createAutocomplete(index, tokenize)

    console.log(autocomplete('münchen'))

    return (
        <>

        </>
    )
}

export default DB