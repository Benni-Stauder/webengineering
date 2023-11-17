import {Component} from "react";

const tagesschau = "https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml";
const RTL = "https://www.rtl.de/rss/feed/news";

class RSSFeed extends Component {
    constructor(props) {
        super(props);
        this.setState({
            data: []
        })
    }

    componentDidMount() {
        const qryRSS = 'select * from rss where url='+'"'+RTL+'"';
        fetch("http://query.yahooapis.com/v1/public/yql", {q: qryRSS, format: "json"}).then(
            (data) => {
                console.log(data)
            }
        )
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default RSSFeed;