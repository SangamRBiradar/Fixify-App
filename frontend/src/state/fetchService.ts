
import axios from "axios";

const api = "http://localhost:8080/services";

export const fetchService = async()=>{
    try {
        const response = await axios.get(api,{
            params: {category: "2" }});
        console.log(response);
    }catch(error){
        console.log(error);
    }
}