import { green } from "@mui/material/colors";
import Success from "../utils/Scccejpg.jpg"

const CheckoutSuccess = () => {
    return (
        <div>
            <img className="mx-5" class="rounded mx-auto d-block" src={Success} style={{width: "500px", height: "400px"}}/>
    <h2 style={{textAlign: "center", color: green}}>
    Покупка звершена успешно!<br/> 
    <h1 style={{textAlign: "center", color: green}}>Благодарим за покупку!</h1></h2>
        </div>
        
)}
export default CheckoutSuccess;