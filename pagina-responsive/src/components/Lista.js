import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';

const Url="http://192.168.10.128:3030/donadores";


const Lista=()=>{
const [data, setData] = useState([]);


const peticionGet=async()=>{
  await axios.get(Url)
  .then(response=>{
      setData(response.data);
      console.log(response.data)
  })
}

useEffect(()=>{
  async function fetchData(){
    await peticionGet();
  }
  fetchData();
  
},[])

return (
  <div className="text-center">
   <TableContainer>
   <Table>
     <TableHead>
       <TableRow>
         <TableCell>Nombre</TableCell>
         <TableCell>Apellido</TableCell>
         <TableCell>Email</TableCell>
         <TableCell>Celular</TableCell>
       </TableRow>
     </TableHead>

     
     <TableBody>
          {data.map(dato=>(
            <TableRow key={dato.id}>
              <TableCell>{dato.nombre}</TableCell>
              <TableCell>{dato.apellido}</TableCell>
              <TableCell>{dato.email}</TableCell>
              <TableCell>{dato.celular}</TableCell>
            </TableRow>
          ))}
          </TableBody> 
     </Table>  
   </TableContainer>
  </div>
);
}
export default Lista