import React, { useState, useEffect } from "react"
import './Datagrid.css'
import axios from "axios"
import  Pagination  from "./Pagination"

const  DatagridComponent = () => {
    const [data, setData] = useState<any>([{}])
    const [ profile, setProfile ] = useState<any>([{}])
    const [ option, setOption ] = useState("")
    
    
    const [ loading, setLoading ] = useState(false)
    const [ userInput, setUserInput ] = useState({
        firstname: "",
        lastname: "",
        gender: ""
    })


    useEffect(() => {
        const getData = async() => {
            try {
                setLoading(true)
                await axios.get('http://localhost:5000/')
                .then(res => {
                    
                    setData(res.data.data)
                    setProfile(res.data.data)
                    setLoading(false)
                }) 
                
            } catch (error) {
                setLoading(false)
            }

        }

        getData()
    }, [])


    //Pagination
    const [ activePage, setActivePage ] = useState(1)
    const [ dataPerPage] = useState(15)

    const handleSort = (e: any) => {
        // setData(data)
        if(e.target.value === ""){
            setData(profile)
        }else {
            let sortedProfile = profile.filter((item: any) => item.gender === e.target.value)
            setData(sortedProfile)
        }
    }
 
    

    const handleDelete = (id: any) => {
        setData((items: any) => items.filter((_: any, i: any) => i !== id))
       
    }

    const handleSave = (e: any, item: any, index: number) => {
        const test = data
        // if(e.key === 'Enter'){
            test[index] = {...test[index],[e.target.name]:e.target.value}
            setData([...test])
        // }
        
        
    }

    


    const indexOfLastData = activePage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = Array.from(data)?.slice(indexOfFirstData, indexOfLastData)

    const paginate = (number: number) => setActivePage(number)
   
    
    return (
        <div className="bodyall">
            <p className="namecreator">SAMSON-OKEJI DATAGRID @KLAS</p>
        <div className="container">
            <div className="option">
                <span style={{color: "#6b7280", marginRight: "5px", marginTop: "10px"}}>Sort</span>
                <select name="" id=""  className="classic select"
                onChange={(e) => {
                    setOption(e.target.value)
                    handleSort(e)
                    }} value={option}>
                    <option className="optiongender" style={{color:"white", background:"#654321"}} value="" >All</option>
                    <option style={{color:"white", background:"#654321"}} value="male">MALE</option>
                    <option style={{color:"white", background:"#654321"}} value="female">FEMALE</option>
                    
                    
                </select>
            </div>
            <div className="header">
                <div className="Id">ID</div> 
                <div className="firstName">FIRST NAME</div>
                <div className="lastName">LAST NAME</div>
                <div className="status">GENDER</div> 
                <div className="action">ACTION</div> 
            </div>
            <div>
                {loading ? "loading...":   <div>
                    {currentData?.map((item: any, index: any) => (
                        
                        <div className="headerInput" key={item.id} >
                            <div className="cellInput1">
                                <input defaultValue={item.id} disabled />
                            </div>
                            <div className="cellInput2">
                                <input 
                                    defaultValue={item.firstname} 
                                    onChange={(e) => {
                                        setUserInput((values) => ({...values, [e.target.name]: e.target.value}))
                                        
                                    }} 
                                    onBlur={(e) => {
                                        handleSave(e, item, index)
                                    }}
                                    name="firstname" />
                            </div>
                            <div className="cellInput3">
                                <input 
                                    defaultValue={item.lastname} 
                                    onChange={(e) => {
                                        setUserInput((values) => ({...values, [e.target.name]: e.target.value}))
                                       
                                    }} 
                                    onKeyDown={(e) => {
                                        handleSave(e, item, index)
                                    }}
                                    name="lastname" />
                            </div>
                            <div className="cellInput4">
                                <input 
                                    defaultValue={item.gender} 
                                    onChange={(e) => {
                                        setUserInput((values) => ({...values, [e.target.name]: e.target.value}))
                                        
                                    }} 
                                    onKeyDown={(e) => {
                                        handleSave(e, item, index)
                                    }} 
                                    name="gender" />
                            </div>
                            <div className="cellInput5" onClick={() => handleDelete(index)}>
                            <button className="delete">Delete</button>
                            </div>
                        </div>
                        ))}
            </div>}
            </div>
           

            <Pagination dataPerPage={dataPerPage} total={100000} paginate={paginate} />
        </div>
        </div>
    )
}

export default DatagridComponent