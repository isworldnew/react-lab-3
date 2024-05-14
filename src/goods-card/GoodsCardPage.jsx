import bicycles from "../common-components/data";
import { useParams } from 'react-router-dom';
import './GoodsCardPage.css'
import ProductInfo from "../common-components/product-info/ProductInfo.jsx"
import Button from "../common-components/button/Button";
import StarRating from "./star-rating/StarRating.jsx";
import { addToCart } from "../common-components/localStorageManagement.js";
import Header from "../common-components/header/Header.jsx";

export default function GoodsCard() {

    const { id } = useParams();
    const selectedBicycle = bicycles.find(bicycle => bicycle.id === parseInt(id));

    const handleStarClick = (clickedIndex) => {
        selectedBicycle.rating = clickedIndex;
    };

    function addToCartHandler(bicycleId) {
        addToCart(bicycleId, 1);
    }

    return (
        <>
            <Header></Header>
            <div>
                <div className="goods-card">

                    <div className="general-info">
                        <img
                            src={"../../" + selectedBicycle.img}
                            width="50%"
                            alt="* bicycle image *"
                            style={{ borderRadius: '20px' }}
                        />
                        <div className="name-price">
                            <ProductInfo fontSize="40px" fontWeight="bold">{selectedBicycle.name}</ProductInfo>
                            <ProductInfo fontSize="30px" fontWeight="bold">{selectedBicycle.price + " руб."}</ProductInfo>
                            <Button onClickFunctionHandler={() => addToCartHandler(selectedBicycle.id)}>В корзину</Button>
                            <StarRating rating={selectedBicycle.rating} onStarClick={handleStarClick} /> 
                        </div>
                    </div>

                    <div className="features">
                        <div className="feature">
                            <ProductInfo fontSize="25px">{selectedBicycle.description}</ProductInfo>
                        </div>
                        {selectedBicycle.features.map((feature, index) => (
                            <div key={index} className="feature">
                                <ProductInfo fontSize="20px" fontWeight="bold">{feature[0] + ": "}</ProductInfo>
                                <ProductInfo fontSize="20px">{feature[1]}</ProductInfo>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </>
    );
}