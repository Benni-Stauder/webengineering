import React, {Component} from 'react';
import $ from 'jquery';
import Search from './Search';
import SearchResultList from './SearchResultList';

class Wikipedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        };
    }

    handleSearch(val) {
        if (val.length === 0) {
            this.setState({searchResult: []})
            return
        }
        let wikipediaSearchUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + val;
        $.ajax({
            url: wikipediaSearchUrl,
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (result) {
                this.setState({
                    searchResults: result.query.search
                });
            }.bind(this)
        })
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{display: 'flex'}}>Wikipedia Viewer</h1>
                    <a style={{display: 'flex'}} target='_blank' href='https://en.wikipedia.org/wiki/Special:Random'
                       rel="noreferrer">Click here for a Random article</a>
                    <Search onSearch={this.handleSearch.bind(this)}/>
                    <SearchResultList data={this.state.searchResults}/>
                </div>
            </div>
        );
    }
}

export default Wikipedia;
