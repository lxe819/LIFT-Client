function AdminProductForm({ token }: { token: string }){
    return (
        <>
            <h1>Edit Product page</h1>
            <form>
                <label>Product Name
                    <input name="product_name" type="text" />
                </label>
                <label>Product Images</label>
                <label>Short Description
                    <textarea name="short_desc" />
                </label>
                <label>Unit Price
                    <input name="unit_price" type="number" />
                </label>
                <label>Category
                    {/* <select */}
                </label>
                <label>Stock Size
                    {/* <select */}
                </label>
                <label>Stock QTY
                    <input name="stock_qty" type="number" />
                </label>
            </form>
        </>
    )
}; 

export default AdminProductForm; 