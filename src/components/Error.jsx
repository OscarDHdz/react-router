import React from 'react';

const Error = ({message}) => (
    <p className="alert alert-danger p3 mt-5 p3 my-5 text-uppercase font-weight-bold">
        {message}
    </p>
);
 
export default Error;