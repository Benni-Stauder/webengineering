import React, {Component} from 'react';

function getSrc(content) {
    let splitContent = content.split('"');
    return splitContent[1]
}

function getHeight(content) {
    let splitContent = content.split('"');
    return splitContent[5]
}

function getWidth(content) {
    let splitContent = content.split('"');
    return splitContent[3]
}

function getAlign(content) {
    let splitContent = content.split('"');
    return splitContent[7]
}

export class RSSFeed extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rss: []
        };
        this.setRss = this.setRss.bind(this);
    }
    setRss(json) {
        this.setState({
            rss: json.items
        });
    }
    render () {
        console.log(this.state.rss.map)
        const listItems = this.state.rss.map(items =>
            <li key={items.guid}>
                <img src={getSrc(items.content)} alt={items.titel} height={getHeight(items.content)} width={getWidth(items.content)} align={getAlign(items.content)}/>
                <p>
                    <b>
                        <a href = {items.link}>{items.title}</a>
                    </b>
                </p>
            </li>
        );
        return <ul>{listItems}</ul>;
    }

    componentDidMount() {
        const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        const rssUrl = 'https://www.rtl.de/rss/feed/news';
        fetch(parseUrl + rssUrl)
            .then(response => response.json())
            .then((json) => {
                if (json.status === 'ok') {
                    this.setRss(json);
                    console.log(json)
                }else {
                    console.log("failed");
                }
            });
    }
}

export default RSSFeed