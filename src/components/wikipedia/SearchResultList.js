import React, {Component} from 'react';
import SearchResult from './SearchResult';

class SearchResultList extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {this.props.data.map(resultItem =>
                    <SearchResult key={resultItem.title} data={resultItem}/>
                )}
            </div>
        );
    }
}

export default SearchResultList;
