function ProductForm(){
    return (
        <>
            <h1>Edit Product page</h1>
            <h5>Props will be passed in to fill up default value data. This will be usable component shared across both edit & add product function. If all the fields in the props are empty, then it will be "CREATE new" then button "ADDD" and "BACK" will be available and other buttons hidden, else buttons "UPDATE" and "DELETE" will appear.Maybe can just pass boolean state in to inform whether it's empty form or not..?</h5>
        </>
    )
}; 

export default ProductForm; 