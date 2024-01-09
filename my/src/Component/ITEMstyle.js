import { CiCircleCheck } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import './home.css'


const Item=(props)=>{
const {data,completed,deleter}=props
const trig=()=>{
    completed(data.Id)
}

const deltr=()=>{
    deleter(data.Id)
}

console.log(data.comp)

const taskst=data.comp?<FaCircleCheck onClick={trig}/>:<CiCircleCheck onClick={trig}/>

const com=data.comp?'completedtask':'active'

return <li> 
    <div className='de final'>
    {taskst}
    <p className={com}>{data.task}</p>
    <div>
        <MdDeleteOutline onClick={deltr}/>
        </div>
    </div>
    <hr/>
    </li>

}

export default Item