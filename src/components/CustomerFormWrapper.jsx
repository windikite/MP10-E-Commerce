import { useParams, useNavigate } from "react-router-dom";
import CustomerForm from "./CustomerForm";

function CustomerFormWrapper(){
    // hook to get params passed to this component in url
    let params = useParams()
    // good for dynamic destinations where things on the page need to change based on a parameter such as an id
    let navigate = useNavigate()
    // return form component with params and navigate 
    return <CustomerForm params={params} navigate={navigate} />
}

export default CustomerFormWrapper