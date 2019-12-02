import React, {Fragment} from 'react';
import ListProduct from './ListProduct';

const Products = ({products, setDataReload}) => {
    return ( 
        <Fragment>
            <h1 className="text-center">Products</h1>
            <ul className="list-group mt-5">
                {
                    products.map(prod => (
                        <ListProduct
                            key={prod.id}
                            product={prod}
                            setDataReload={setDataReload}
                        />
                    ))
                }
            </ul>

        </Fragment>
    );
}
 
export default Products;