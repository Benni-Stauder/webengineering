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