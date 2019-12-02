import React, {useState} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const AddProduct = ({history, setDataReload}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);

    const readRadioValue = e => {
        setCategory(e.target.value);
    };

    const addProduct = async e => {
        e.preventDefault();
        if (name === '' || price === '' || category === '') {
            return setError(true);
        }
        setError(false);

        try {
            const result = await axios.post('http://localhost:4000/dishes', {
                name, price, category
            });

            if (result.status === 201) {
                Swal.fire(
                    'Dish Added',
                    'Your dish was added successfuly',
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
        history.push('/products')

    }

    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Add New Product</h1>

            {(error) ? <Error message='All fields are required'/> : null}

            <form
                className="mt-5"
                onSubmit={addProduct}
            >
                <div className="form-group">
                    <label>Dish Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Dish Name"
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Dish Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="price"
                        placeholder="Dish Price"
                        onChange={e => setPrice(e.target.value)}
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
                    />
                    <label className="form-check-label">
                        Salad
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Dish" />
            </form>
        </div>
    );
}
 
export default withRouter(AddProduct);