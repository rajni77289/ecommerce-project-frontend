import API from "../components/API/API";

const addToCart = async (id) => {
        console.log("click btn")
        const res = await API.post(`/carts/addtocart/${id}`)
        console.log(res);
    }
export default addToCart