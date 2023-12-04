// noinspection JSUnresolvedReference

import {useEffect, useState} from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultList from './SearchResult';

const API_KEY = `31607V511WRQOET8`;
const API_BASE_URL = 'https://www.alphavantage.co/query';

const SearchBar = ({selectedStock, seeStockDetail}) => {
    const [searchKeyWord, setSearchKeyWord] = useState(selectedStock);
    const [resultList, setResultList] = useState([]);

    useEffect(() => {
        const searchStock = () => {
            axios.get(`${API_BASE_URL}`,{
                params: {
                    function: 'SYMBOL_SEARCH',
                    keywords: searchKeyWord,
                    apikey: API_KEY
                }
            })
                .then(json => {
                    console.log(json.data)
                    try {
                        if (json.data['Information'] === "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.") {
                            console.log("API Limit erreicht")
                        }
                    } catch (e) {

                    }
                    setResultList(json.data?.bestMatches);
                })
        }
        const timeOutId = setTimeout(() => {
            if (searchKeyWord) {
                searchStock();
            }
        }, 500);

        return () => {
            clearTimeout(timeOutId);
        }
    }, [searchKeyWord])

    const handleSearchStock = (e) => {
        const stockSymbolValue = e.target.value;
        setSearchKeyWord(stockSymbolValue);
    }

    const handleSearchSubmission = (e) => {
        e.preventDefault();
        seeStockDetail(searchKeyWord);
        setResultList(null);
    }

    // noinspection JSValidateTypes
    return (
        <form className='search-box-form-container' onSubmit={(e) => handleSearchSubmission(e)}>
            <div className='search-box-container'>
                <div className='search-input-container'>
                    <input
                        className='search-input'
                        id='search-input-box'
                        value={searchKeyWord}
                        placeholder='STOCK SYMBOL HERE'
                        onChange={handleSearchStock}
                        pattern='[\w.]+'
                        title='Please only use letters or numbers'
                    />
                    <button aria-label='Search' className='search-glass-btn' onClick={() => {seeStockDetail(searchKeyWord); setResultList(null)}}>
                        <SearchIcon classes={{root: 'search-glass'}}/>
                    </button>
                </div>
            </div>
            <SearchResultList
                suggestionList={resultList}
                seeStockDetail={seeStockDetail}
                typedStock={searchKeyWord}
                selectStock={setSearchKeyWord}
            />
        </form>
    )
}

export default SearchBar;