import Card from "../card/Card.jsx";
import Image from "../image/Image.jsx";
import ProductInfo from "../product-info/ProductInfo.jsx";
import Button from "../button/Button.jsx";
import bicycles from "../../common-components/data.js"; //не надо заключать имя массива в {}!
import { addToCart } from "../../common-components/localStorageManagement.js"; //а вот имя функции - надо
import './Cards.css';

export default function Cards() {

    const allCards = []; //все карточки, чтобы потом
    //ходить по этому массиву во время поиска

    function addToCartHandler(bicycleId) {
        addToCart(bicycleId, 1);
    }

    function renderGoods() {
        bicycles.forEach(bicycle => {
            allCards.push(
                <Card id={bicycle.id} key={bicycle.id}>
                    <Image imageRef={bicycle.img} path="/goods-card" param={bicycle.id}></Image>
                    <ProductInfo fontSize="15px" fontWeight="bold">{bicycle.name}</ProductInfo>
                    <ProductInfo fontSize="15px">{bicycle.price + " руб."}</ProductInfo>
                    <Button onClickFunctionHandler={() => addToCartHandler(bicycle.id)}>В корзину</Button>
                </Card>
            );
        });
    }

    renderGoods();

    return (
        <div className="grid-container">
            {allCards}
        </div>
    );

}