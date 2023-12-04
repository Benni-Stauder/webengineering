import React, {useEffect} from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from "axios";
import {IBMCache} from "./cache/IBM";
import {MFSTCache} from "./cache/MFST";

let API_KEY = "31607V511WRQOET8"
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = (props) => {
    let {stockSymbol} = props
    let chartData = []
    let chartVolume = []
    let chartClose = []
    let isLoaded = false

    const options = {
        theme: "light1",
        title: {
            text: `Aktienkurs von ${stockSymbol}`
        },
        subtitles: [{
            text: "Preis-Volumen Trend"
        }],
        charts: [{
            axisX: {
                lineThickness: 5,
                tickLength: 0,
                labelFormatter: function () {
                    return "";
                },
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function () {
                        return "";
                    }
                }
            },
            axisY: {
                title: `${stockSymbol} Kursentwicklung`,
                prefix: "€",
                tickLength: 0
            },
            toolTip: {
                shared: true
            },
            data: [{
                name: "Preis (in EUR)",
                yValueFormatString: "€#,###.##",
                type: "candlestick",
                dataPoints: chartData
            }]
        }, {
            height: 100,
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Volume",
                prefix: "€",
                tickLength: 0
            },
            toolTip: {
                shared: true
            },
            data: [{
                name: "Volume",
                yValueFormatString: "€#,###.##",
                type: "column",
                dataPoints: chartVolume
            }]
        }],
        navigator: {
            data: [{
                dataPoints: chartClose
            }],
            slider: {
                minimum: new Date("2023-01-01"),
                maximum: new Date()
            }
        }
    };
    const containerProps = {
        width: "100%",
        height: "450px",
        margin: "auto"
    };
    const ParseData = (data) => {
        if (!isLoaded) {
            for (let key in data['Time Series (Daily)']) {
                chartData.push({
                    x: new Date(key),
                    y: [
                        parseFloat(data['Time Series (Daily)'][key]['1. open']),
                        parseFloat(data['Time Series (Daily)'][key]['2. high']),
                        parseFloat(data['Time Series (Daily)'][key]['3. low']),
                        parseFloat(data['Time Series (Daily)'][key]['4. close'])
                    ]
                })
                chartVolume.push({
                    x: new Date(key),
                    y: parseFloat(data['Time Series (Daily)'][key]['5. volume'])
                })
                chartClose.push({
                    x: new Date(key),
                    y: parseFloat(data['Time Series (Daily)'][key]['4. close'])
                })
            }

            isLoaded = true
        }
    }
    const fetchAPIResponse = () => {
    const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${API_KEY}`

    axios({
        method: 'GET',
        url: API_CALL
    })
        .then((response) => {
            if (!response.ok) return new Error("Fehler beim Laden der Aktiendaten")
            console.log(response.data)
            try {
                if (response.data['Information'] === "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.") {
                    throw new Error()
                }
            } catch (e) {
                throw new Error("API Error")
            }
            return response.data;
        })
        .then(data => ParseData(data));
    }

    if (stockSymbol === 'IBM') {
        ParseData(IBMCache)
    } else if (stockSymbol === 'MFST') {
        ParseData(MFSTCache)
    } else if (stockSymbol === 'T34') {
        ParseData(IBMCache)
    }
    else fetchAPIResponse()

    useEffect(() => {
        function handleResize() {
            // Update the state or perform any other actions when the
            // browser is resized
        }

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {
                isLoaded &&
                <CanvasJSStockChart containerProps={containerProps} options={options}/>
            }
        </>
    );
}

export default StockChart;