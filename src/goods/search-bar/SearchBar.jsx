import React, { useState } from 'react';
import './SearchBar.css'

export default function SearchBar() {
    const [nameToSearch, setNameToSearch] = useState('');

    function handleSearchBarChange(event) {
        setNameToSearch(event.target.value);
        filterCards(event.target.value);
    }

    function filterCards(nameToSearch) {
        const cards = document.querySelectorAll('.grid-container .card');
    
        cards.forEach(card => {
            const productInfo = card.querySelector('.product-info'); //было productInfos
            let cardMatch = false;

            // productInfos.forEach(productInfo => {
                const name = productInfo.textContent.toLowerCase().trim();

                if (name.includes(nameToSearch))
                    cardMatch = true;
                
            // });

            card.style.display = cardMatch ? 'block' : 'none';
        });
    }
    
    

    return (
        <>
            <input
                type="text"
                value={nameToSearch}
                onChange={handleSearchBarChange}
                placeholder="Поиск по названию"
                className="search-bar"
            />
        </>
    );
}
