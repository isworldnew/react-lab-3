import './ProductInfo.css';

export default function ProductInfo({ children, fontSize, fontWeight }) {
    return (
        <p className="product-info" style={{ fontFamily: 'Montserrat', fontSize: fontSize, fontWeight: fontWeight }}>{children}</p>
    );
}
