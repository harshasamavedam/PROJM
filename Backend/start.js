const express=require('express')
const sql=require('mysql')
const app=express()
const cros=require('cors')
app.use(express.json())

app.use(cros())

const db=sql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password:'19B91a02i3@',
    database:'ecnomizer'
})

const  db1=sql.createConnection({
    host:'localhost',
    user:'root',
    database:'sakila',
    password:'19B91a02i3@'
})

db1.connect((err)=>{
    if (err) throw err

    console.log('actor cnnected')

})

app.listen(3001,()=>{
    console.log('sucess')
})

const quer=` select * from Todo`

let m=db.connect((err)=>{
    if(err) throw err
    console.log('connected')
})

app.get('/', (req,resp)=>{
    db.query(quer,(err,result)=>{
        if(err) throw err
        resp.send(result)
    })
})

app.get('/stared', (req,resp)=>{
    const quer=`select * from stodo`
    db.query(quer,(err,result)=>{
        if(err) throw err
        resp.send(result)
    })
})

const qr1=`select * from actor where actor_id='44'`

app.get('/delete',async(req,resp)=>{
    db1.query(qr1,(err,result)=>{
        if(err) throw err
        resp.send(result)
    })
})

app.post('/post',(req,resp)=>{
    const Id=req.body.Id
    const comp=req.body.comp
    const task=req.body.task
    console.log(comp)
    const quer=`insert into Todo values(?,?,?)`
    db.query(quer,[Id,comp,task],(err,res)=>{
        if(err) throw err
        resp.send('posted')
    })

})


app.delete('/delete',(req,resp)=>{
    const Id=req.body.Id
const quer=`delete from todo where Id='${Id}' ` 
    db.query(quer,(err,result)=>{
        if(err)throw err
        resp.send('Deleted')
    })
})

app.post('/update',(req,resp)=>{
    const Id=req.body.Id
    console.log(Id)
    const comp=req.body.comp
    console.log(comp)
   const quer=`update todo set comp =${comp} where Id ='${Id}'`
   db.query(quer,(err,result)=>{
    if(err) throw err
    console.log('updated')
   })
 
})


app.post('/star',(req,resp)=>{
    const data=req.body
    const {Id,comp,task}=data
    const quer=`insert into  stodo values(?,?,?)`
    db.query(quer,[Id,comp,task],(err,result)=>{
        if(err) throw err
        resp.send('star posted')
    })
})
