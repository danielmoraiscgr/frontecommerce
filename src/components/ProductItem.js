import React from "react";

const ProductItem = props => {
  const { product } = props;
  return (
    <div className=" column is-half ">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img              
                src={product.image}
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">R$ {product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " Disponível"}</small>
            ) : (
              <small className="has-text-danger">Esgotado</small>
            )}
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1
                  })
                }
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;