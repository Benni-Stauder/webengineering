import {useState} from "react";
import {buildIndex} from "./synchronous_autocomplete";
import normalize from 'normalize-for-search'
import {createAutocomplete} from "./autocomplete";
import {dbcache} from "./data/cache";

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
    const [searchWord, setSearchWord] = useState([])
    const [suggestion, setSuggestion] = useState([])

    const applicationStyle = {}
    const containerStyle = {width: '280px', display: 'flex', flexDirection: 'column'}
    const dropDownStyle = {backgroundColor: 'white', display: 'flex', flexDirection: 'column', border: '1px solid gray'}
    const dropDownEmptyStyle = {border: 'none'}
    const dropDownRowStyle = {cursor: 'pointer', textAlign: 'start', margin: '2px 0'}
    const inputStyle = {width: '220px'}
    const searchInnerStyle = {display: 'flex'}

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

    let names = []
    dbcache.forEach(item => names.push(
        {
            'id': item.stationID,
            'name': item.names.DE.name,
            'weight': 1
        })
    )
    const index = buildIndex(tokenize, names)
    const autocomplete = createAutocomplete(index, tokenize)

    const handleUpdate = (e) => {
        let value = e.target.value
        let tmp = []
        autocomplete(value, 5, true).forEach(item => {
            tmp.push(names.find(it => {
                return it.id === item.id
            }).name)
        })
        setSuggestion(tmp)
        setSearchWord(value)
    }

    return (
        <div style={}>
            <div className={"search-inner"}>
                <input
                    type={"text"}
                    name={"Suche Station"}
                    id={"searchBar"}
                    placeholder={"Suche Station"}
                    value={searchWord}
                    onChange={handleUpdate}
                />
                <button name={"Search"}
                        onClick={() => {
                        }}
                >
                    Search
                </button>
            </div>
            <div className={"dropdown"}>
                {
                    (!suggestion.includes(searchWord))
                    &&
                    suggestion.map(it =>
                        <div key={it}
                             onClick={() => setSearchWord(it)}
                        >
                            {it}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default DB