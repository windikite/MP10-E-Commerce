import { useParams, useNavigate } from "react-router-dom";
import CustomerList from "./CustomerList";

function CustomerListWrapper({onCustomerSelect}){
    // hook to get params passed to this component in url
    let params = useParams()
    // good for dynamic destinations where things on the page need to change based on a parameter such as an id
    let navigate = useNavigate()
    // return form component with params and navigate 
    return <CustomerList params={params} navigate={navigate} onCustomerSelect={onCustomerSelect} />
}

export default CustomerListWrapper