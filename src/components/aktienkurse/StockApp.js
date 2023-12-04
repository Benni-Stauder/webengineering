import {useEffect, useState} from 'react';
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

    useEffect(() => {
        function handleResize() {
            // Update the state or perform any other actions when the
            // browser is resized
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="App">
            <SearchBar seeStockDetail={seeStockDetail} selectedStock={stock} />
            {
                stock.length >= 2 &&
                <StockChart stockSymbol={stock} />
            }
        </div>
    );
}

export default StockApp;