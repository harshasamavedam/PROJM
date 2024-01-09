import {Component} from 'react'
import {v4} from 'uuid'
import Item from './ITEMstyle'
import './home.css'

export default class Home extends Component{
    state={data:[],stared:[],task:''}
    componentDidMount(){
        this.fet()
    }

 
    
    fet=async ()=>{
        const l=await fetch('http://localhost:3001/')
        const stared=await fetch('http://localhost:3001/stared')
        console.log('stared')
        console.log(stared.json())
        const m=await l.json()
        console.log(l.status)
        if(l.status===200){
            this.setState({data:m})
        }
    }


    completed=(Id)=>{
        const {data}=this.state
        const dele=data.filter((each)=>each.Id===Id)
        const h=!dele[0].comp
        let uda={
            Id:dele[0].Id,
            comp:h,
task:dele[0].task
        }
        const options={
            method:'POST',
            body:JSON.stringify(uda),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }
      const  url='http://localhost:3001/update'
        const m=fetch(url,options)
        console.log(uda)
        this.fet()
    }

    dele=async (Id)=>{
        const {data}=this.state
        const dele=data.filter((each)=>each.Id===Id)
        const options={
            method:'DELETE',
            body:JSON.stringify(dele[0]),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }

        const url='http://localhost:3001/delete'

        const m=await fetch(url,options)
        this.fet()

    }

    taskadd=async ()=>{
        const url='http://localhost:3001/post'
        console.log('entered add')
        const {task}=this.state

        const data={
            Id:v4(),
            comp:false,
            task:task
        }

        const options={
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }
        const m=await fetch(url,options)
        this.fet()
        this.setState({task:''})

    }

    taskad=(event)=>{
        const {task}=this.state
        this.setState({task:event.target.value})
    }

    render(){
        const {data,task}=this.state
        const dat=new Date()
        const date=dat.getDate()
        const day=dat.getDay()
        const mon=dat.getMonth(1)

        const weeks=['sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const month=['January','February','March','April','May','June','July','August','September','October','November','December']
        console.log(data.length)

        return <div className='firstbox'>
            <div className='secondbox'>
                    <div className='Head'>
                   <div> <p className='de'>{`${weeks[day]}, ${month[mon]} ${day}`}</p>
                    <p className='len'>{data.length} Active Tasks</p>
                    </div>
                    <p className='active'>Active tasks</p>
                    <p className='completedtask'>Completedtask</p>
                    </div>
                <div className='inpurcontainer'>
                    <input type='text' placeholder='Enter a task....' className='inoutsty' onChange={this.taskad} value={task}/>
                    <button type='button' onClick={this.taskadd} className='butsty'>Add Task</button>
                </div>
                <div className='taskmanager'>
                    <hr/>
                    <ul className='ulstyle'>
                        {data.map((each)=><Item data={each} key={each.Id} completed={this.completed} deleter={this.dele}/>)}
                        </ul>
                </div>
            </div>
            </div>
    }
}