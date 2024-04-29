import { FC } from "react";
import "./propaganda.css";
import image from "./image.jpg";

const Propaganda: FC = () =>{
  return<>
  <div className="image">
    <img src= {image} alt="" />
  </div>
  
  </>
}
export default Propaganda;