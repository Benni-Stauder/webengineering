import React, {useEffect, useState} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const getSrc = (content) => {
    try {
        let splitContent = content.split("src=")[1]
        splitContent = splitContent.split('"')[1]
        return splitContent
    }
    catch (error) {
        return ""
    }
}

const RSSFeed = () => {

    const [tagesschauHtml, setTagesschauHtml] = useState([])
    const [RTLHtml, setRTLHtml] = useState([])
    const [NYTimesHtml, setNYTimesHtml] = useState([])

    useEffect(() => {
        fetchTagesschauRSS()
        fetchRTLRSS()
        fetchNYTimesRSS()
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    const centerStyleH2 = {textAlign: "center", objectFit: "fill", color: "black"}
    const divStyle = {textAlign: "center", backgroundColor: "lavender"}
    const imageStyle = {textAlign: "center", width: "80vw", maxHeight: "80vh", objectFit: "cover"}
    const linkStyle = {color: "black"}


    const fetchTagesschauRSS = () => {
        const rssUrl = 'https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml';
        fetch(rssUrl)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item")
                let tmpHtml = []
                items.forEach(el => {
                    tmpHtml.push(<div key={el.querySelector("guid").innerHTML}
                                      style={divStyle}
                                      className={"each-slide-effect"}>
                        <h2 style={centerStyleH2}>
                            <a href={el.querySelector("link").innerHTML}
                               target={"_blank"}
                               rel={"noreferrer"}
                               style={linkStyle}>
                                {el.querySelector("title").innerHTML}
                            </a>
                        </h2>
                        <a href={el.querySelector("link").innerHTML}
                           target={"_blank"}
                           rel={"noreferrer"}
                           style={linkStyle}>
                        <img src={getSrc(el.querySelector("encoded").innerHTML)}
                             alt={el.querySelector("title").innerHTML}
                             style={imageStyle}/>
                        </a>
                    </div>)
                })
                setTagesschauHtml(tmpHtml)
            })
    };

    const fetchRTLRSS = () => {
        const rssUrl = 'https://www.rtl.de/rss/feed';
        fetch(rssUrl)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item")
                let tmpHtml = []
                items.forEach(el => {
                    tmpHtml.push(<div key={el.querySelector("guid").innerHTML}
                                      style={divStyle}
                                      className={"each-slide-effect"}>
                        <h2 style={centerStyleH2}>
                            <a href={el.querySelector("link").innerHTML}
                               target={"_blank"}
                               rel={"noreferrer"}
                               style={linkStyle}>
                                {el.querySelector("title").innerHTML}
                            </a>
                        </h2>
                        <a href={el.querySelector("link").innerHTML}
                           target={"_blank"}
                           rel={"noreferrer"}
                           style={linkStyle}>
                        <img src={getSrc(el.querySelector("encoded").textContent)}
                             alt={el.querySelector("title").innerHTML}
                             style={imageStyle}/>
                        </a>
                    </div>)
                })
                setRTLHtml(tmpHtml)
            })
    }

    const fetchNYTimesRSS = () => {
        const rssUrl = 'https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml';
        fetch(rssUrl)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item")
                let tmpHtml = []
                console.log(data)
                items.forEach(el => {
                    tmpHtml.push(<div key={el.querySelector("guid").innerHTML}
                                      style={divStyle}
                                      className={"each-slide-effect"}>
                        <h2 style={centerStyleH2}>
                            <a href={el.querySelector("link").innerHTML}
                               target={"_blank"}
                               rel={"noreferrer"}
                               style={linkStyle}>
                                {el.querySelector("title").innerHTML}
                            </a>
                        </h2>
                        <a href={el.querySelector("link").innerHTML}
                           target={"_blank"}
                           rel={"noreferrer"}
                           style={linkStyle}>
                        <img src={el.querySelector("content").attributes["url"]["value"]}
                             alt={el.querySelector("title").innerHTML}
                             style={imageStyle}/>
                        </a>
                    </div>)
                })
                setNYTimesHtml(tmpHtml)
            })
    }

    return (
        <>
            <div>
                <h1 style={{textAlign: "center"}}>Tagesschau Nachrichten</h1>
                <Carousel responsive={responsive}>
                    {tagesschauHtml}
                </Carousel>
            </div>
            <div>
                <h1 style={{textAlign: "center"}}>RTL Nachrichten</h1>
                <Carousel responsive={responsive}>
                    {RTLHtml}
                </Carousel>
            </div>
            <div>
                <h1 style={{textAlign: "center"}}>NY Times Nachrichten</h1>
                <Carousel responsive={responsive}>
                    {NYTimesHtml}
                </Carousel>
            </div>
        </>
    )
}

export default RSSFeed