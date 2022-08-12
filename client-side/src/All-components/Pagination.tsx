import React from 'react'
import './Pagination.css'

const Pagination = (props: any) => {
    console.log(props)
    const pageNumber = []
    for(let i = 1; i <= Math.ceil(props.total / props.dataPerPage); i++){
        pageNumber.push(i)
    }
  return (
    <div className="container1">
        
            {pageNumber.map(number => (
                <span key={number} className="number">
                    <span className="text"  onClick={() => props.paginate(number)} style={{color: "black"}}>
                        {number}
                    </span>
                </span>
            ))}
       
    </div>
  )
}

export default Pagination
