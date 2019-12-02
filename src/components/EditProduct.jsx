import React, {useState, useRef} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const EditProduct = ({history, product, setDataReload}) => {
    const nameRef = useRef('');
    const priceRef = useRef('');

    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);

    if (!product) {
        return history.push('/products');
    }

    const readRadioValue = e => setCategory(e.target.value);

    const editProduct = async e => {
        e.preventDefault();

        // Check if radio fiel changed
        let updatedCategory = (category === '') ? product.category : category;

        if (nameRef.current.value === '' || priceRef.current.value === '' || updatedCategory === '') {
            return setError(true);
        }
        setError(false);

        try {
            const result = await axios.put(`http://localhost:4000/dishes/${product.id}`, {
                name: nameRef.current.value, price: priceRef.current.value, category: updatedCategory
            });

            if (result.status === 201) {
                Swal.fire(
                    'Dish Added',
                    'Your dish was updated successfuly',
                    'success'
                )
            }

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong!'
            })
        }
        setDataReload(true);
        history.push('/products');

    }

    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Edit Product</h1>

            {(error) ? <Error message='All fields are required'/> : null}

            <form
                className="mt-5"
                onSubmit={editProduct}
            >
                <div className="form-group">
                    <label>Dish Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Dish Name"
                        ref={nameRef}
                        defaultValue={product.name}
                    />
                </div>

                <div className="form-group">
                    <label>Dish Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="price"
                        placeholder="Dish Price"
                        ref={priceRef}
                        defaultValue={product.price}
                    />
                </div>

                <legend className="text-center">Category:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="dessert"
                        onChange={readRadioValue}
                        defaultChecked={(product.category === 'dessert')}
                    />
                    <label className="form-check-label">
                        Dessert
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="drink"
                        onChange={readRadioValue}
                        defaultChecked={(product.category === 'drink')}
                    />
                    <label className="form-check-label">
                        Drink
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="beef"
                        value="beef"
                        onChange={readRadioValue}
                        defaultChecked={(product.category === 'beef')}
                    />
                    <label className="form-check-label">
                        Beef
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="salad"
                        onChange={readRadioValue}
                        defaultChecked={(product.category === 'salad')}
                    />
                    <label className="form-check-label">
                        Salad
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Update Dish" />
            </form>
        </div>
    );
}
 
export default withRouter(EditProduct);