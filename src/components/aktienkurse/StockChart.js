import React from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from "axios";
import {Outlet} from "react-router-dom";
import {IBMCache} from "./cache/IBM";

let API_KEY = "31607V511WRQOET8"
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = (props) => {
    let {stockSymbol} = props
    let chartData = []
    let chartVolume = []
    let chartClose = []
    let isLoaded = false


    const fetchAPIResponse = async (e) => {
        /*
        //Get current Date and last Month date in the Format YYYY-MM-DD
        const todayDate = new Date()
        const today = todayDate.toLocaleDateString('en-CA')
        const lastYearDate = todayDate
        lastYearDate.setFullYear(todayDate.getFullYear() - 1)
        const lastYear = lastYearDate.toLocaleDateString('en-CA')
        const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${Company}&outputsize=full&apikey=${API_KEY}`

        axios({
            method: 'GET',
            url: API_CALL
        })
            .then(function (response) {
                return response.data;
            })
            .then(function(data) {
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
                        y: data['Time Series (Daily)'][key]['6. volume']
                    })
                    chartClose.push({
                        x: new Date(key),
                        y: data['Time Series (Daily)'][key]['4. close']
                    })
                }
            }
        );*/
        let data = IBMCache;
        for (let key in data['Time Series (Daily)']) {
            chartData.push({
                x: new Date(key),
                y: [
                    parseInt(data['Time Series (Daily)'][key]['1. open']),
                    parseInt(data['Time Series (Daily)'][key]['2. high']),
                    parseInt(data['Time Series (Daily)'][key]['3. low']),
                    parseInt(data['Time Series (Daily)'][key]['4. close'])
                ]
            })
            chartVolume.push({
                x: new Date(key),
                y: parseInt(data['Time Series (Daily)'][key]['5. volume'])
            })
            chartClose.push({
                x: new Date(key),
                y: parseInt(data['Time Series (Daily)'][key]['4. close'])
            })
            isLoaded = true
            console.log(chartData)
            console.log(chartVolume)
            console.log(chartClose)
            console.log(isLoaded)
        }
    }

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
    return (
        <>
            {
                isLoaded &&
                <CanvasJSStockChart containerProps={containerProps} options={options}/>
            }
            <Outlet/>
        </>
    );
}

export default StockChart;