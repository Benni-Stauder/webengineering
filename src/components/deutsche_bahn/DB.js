import {useState} from "react";
import {buildIndex} from "./synchronous_autocomplete";
import normalize from 'normalize-for-search'
import {createAutocomplete} from "./autocomplete";
import {dbcache} from "./data/cache";
import DatePicker from "react-datepicker";
import Collapsible from 'react-collapsible';
import xml2js from 'xml2js'

import "react-datepicker/dist/react-datepicker.css";

const tokenize = str => normalize(str).replace(/[^\w\s]/g, '').split(/\s+/g)

const DB = () => {
    const [searchWord, setSearchWord] = useState([])
    const [suggestion, setSuggestion] = useState([])
    const [doFetch, setDoFetch] = useState(false)
    const [stationData, setStationData] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    let data = []

    const applicationStyle = {
        fontFamily: 'sans-serif',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    const containerStyle = {width: '280px', display: 'flex', flexDirection: 'column'}
    const dropDownStyle = {backgroundColor: 'white', display: 'flex', flexDirection: 'column', border: '1px solid gray'}
    const dropDownEmptyStyle = {border: 'none', visible: false}
    const dropDownRowStyle = {cursor: 'pointer', textAlign: 'start', margin: '2px 0'}
    const inputStyle = {width: '220px'}
    const searchInnerStyle = {display: 'flex'}

    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 1
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    }

    data = dbcache


    let names = []
    data.forEach(item => names.push(
        {
            'id': item.EVA_NR,
            'name': item.NAME,
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
        setSuggestion(value === '' ? [] : tmp)
        setSearchWord(value)
    }

    const handleSearch = () => {
        if (names.filter(value => value.name === searchWord).length > 0) {
            setDoFetch(true)
            let station = data[data.findIndex(value => value.NAME === searchWord)]
            let evaNum = station.EVA_NR
            console.log(station)

            let year = startDate.getFullYear().toString().slice(2, 4)
            let month = (startDate.getMonth() + 1).toString().length === 1 ?
                '0' + (startDate.getMonth() + 1).toString() :
                (startDate.getMonth() + 1).toString()
            let day = startDate.getDate().toString().length === 1 ?
                '0' + startDate.getDate().toString() :
                startDate.getDate().toString()
            let YYMMDD = year + month + day

            let HH = startDate.getHours().toString().length === 1 ?
                '0' + startDate.getHours().toString() :
                startDate.getHours().toString()

            console.log(evaNum)
            console.log(YYMMDD)
            fetch(`https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/plan/${evaNum}/${YYMMDD}/${HH}`, {
                headers: {
                    'DB-Client-Id': '24aacca9795ac08c87e5e0f72e3afdf1',
                    'DB-Api-Key': '488da4ba3b6c584113723e57b139bb48'
                },
                cache: "no-store"
            }).then(response => {
                if (!response.ok) throw new Error("Fehler beim Laden des Fahrplans")
                return response.text()
            })
                .then(data => xml2js.parseString(data, (err, result) => {
                    if (err) throw new Error("Fehler beim parsen des XML Formats")
                    let tmpDepartures = []
                    result.timetable.s.forEach(item => {
                        console.log(item)
                        try {
                            let date = item.dp[0].$.pt.slice(6, 8) + ':' + item.dp[0].$.pt.slice(8, 10)
                            console.log(item.dp[0].$.ppth.split('|'))
                            let stations = item.dp[0].$.ppth.split('|')
                            let gleis = item.dp[0].$.pp
                            tmpDepartures.push({
                                'name': date,
                                'content': stations,
                                'dest': stations[stations.length - 1],
                                'gleis': gleis
                            })
                        } catch (e) {
                        }
                    })
                    setStationData(tmpDepartures)
                }))
        } else setDoFetch(false)

    }

    return (
        <div style={applicationStyle}>
            <div style={containerStyle} className={"search-inner"}>
                <div style={searchInnerStyle}>
                    <input
                        type={"text"}
                        name={"Suche Station"}
                        id={"searchBar"}
                        placeholder={"Suche Station"}
                        value={searchWord}
                        onChange={handleUpdate}
                        style={inputStyle}
                    />
                    <button name={"Search"}
                            onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div
                    style={(!suggestion.includes(searchWord) || searchWord.length === 0) ? dropDownStyle : dropDownEmptyStyle}>
                    {
                        (!suggestion.includes(searchWord) || searchWord.length === 0)
                        &&
                        suggestion.map(it =>
                            <div key={it}
                                 onClick={() => setSearchWord(it)}
                                 style={dropDownRowStyle}
                            >
                                {it}
                            </div>
                        )
                    }
                </div>
                <div style={{width: '280px'}}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH"
                        timeIntervals={60}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
            </div>
            {
                doFetch
                &&
                <div>
                    {stationData.map(item =>
                        <div style={{border: '1px solid black', backgroundColor: 'lavender'}}>
                            <Collapsible style={{border: '4px solid black'}}
                                         trigger={"Abfahrt um: " + item.name + " Uhr nach: " + item.dest + " auf Gleis: " + item.gleis}>
                                <p>Stationen:</p>
                                <ul>{item.content.map(station =>
                                    <li>{station}</li>
                                )}</ul>
                            </Collapsible>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default DB