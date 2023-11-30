import { useEffect, useState } from 'react';
import './StockApp.css';
import SearchBar from './SearchBar';
import StockChart from './StockChart'

const StockApp = () => {
    const [stock, setStock] = useState('');

    useEffect(() => {
        seeStockDetail(stock);
    }, [stock]);

    const seeStockDetail = (symbol) => {
        setStock(symbol);
    }

    return (
        <div className="App">
            <SearchBar seeStockDetail={seeStockDetail} selectedStock={stock} />
            {
                stock !== '' &&
                <StockChart stockSymbol={stock} />
            }
        </div>
    );
}

export default StockApp;