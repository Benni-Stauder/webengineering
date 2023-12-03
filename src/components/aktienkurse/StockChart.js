import React, {useEffect} from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from "axios";
import {IBMCache} from "./cache/IBM";

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
        console.log(data)
        for (let key in data['Time Series (Daily)']) {
            chartData.push({
                x: new Date(key),
                y: [
                    data['Time Series (Daily)'][key]['1. open'],
                    data['Time Series (Daily)'][key]['2. high'],
                    data['Time Series (Daily)'][key]['3. low'],
                    data['Time Series (Daily)'][key]['4. close']
                ]
            })
            chartVolume.push({
                x: new Date(key),
                y: data['Time Series (Daily)'][key]['5. volume']
            })
            chartClose.push({
                x: new Date(key),
                y: data['Time Series (Daily)'][key]['4. close']
            })
        }
    }
    const fetchAPIResponse = () => {
    const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${API_KEY}`

    axios({
        method: 'GET',
        url: API_CALL
    })
        .then(function (response) {
            return response.data;
        })
        .then(ParseData);
    }

    if (stockSymbol === 'IBM') {
        ParseData(IBMCache)
    }
    if (stockSymbol === 'TSLA') {
        ParseData(IBMCache)
    }
    if (stockSymbol === 'BOM') {
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