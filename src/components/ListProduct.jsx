import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ListProduct = ({product, setDataReload}) => {

    const deleteProduct = async id => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          
        if (confirm.value) {
            try {
                const result = await axios.delete(`http://localhost:4000/dishes/${product.id}`);
                if (result.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    setDataReload(true);
                }
    
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!'
                })
            }
        }
        
    }

    return (
        <li  data-category={product.category} className="list-group-item d-flex justify-content-between 
        align-items-center">
            <p>
                {product.name} {'  '}
                <span className="font-weight-bold">${product.price}</span>
            </p>
            <div>
                <Link
                    to={`/products/edit/${product.id}`}
                    className="btn btn-success mr-2"
                >
                    Edit
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                >
                    Remove &times;
                </button>
            </div>
        </li>
    );
}
 
export default ListProduct;