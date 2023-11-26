import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {  Button,Image } from 'react-bootstrap';
import { ArchiveFill, PencilFill } from 'react-bootstrap-icons';
import Pagination from './Pagination';
import SearchBar from './searchBar';

export default function List() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage =  4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [query, setQuery] = useState("");
  const records = Array.from(products).slice(firstIndex, lastIndex);
  const npage = Math.ceil(Array.from(products).length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
            setProducts(data)
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/products/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchProducts()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }
   

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (query !== '') {
       return  await axios.get(`http://localhost:8000/api/products/search/${query}`).then(({ data }) => {
            setProducts(data)
        })
          .catch((err) => {
            setProducts(null)
            console.log(err)
          })
      } else {
        return  await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
          setProducts(data)
      })
      }
    }
  

    return (
        <div className="container">
            <div className="row">
                <div className='col-12 mb-2'>
                    <div className='d-flex justify-content-between' >
                        <div>

                        <SearchBar handleSubmit={handleSubmit} query={query} setQuery={setQuery} />
                        </div>
                    <Link className='btn btn-primary mb-2 float-end' to={"/product/create"}>
                        Create Product
                    </Link>
                    </div>
                   
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records.length > 0 && (
                                            records.map((row, key) => (
                                                <tr key={key}>
                                                     <td>{key+1}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.price}</td>
                                                    <td>{row.description}</td>
                                                    <td><Image style={{maxWidth:'100%', height:'50px'}} fluid  src={`http://localhost:8000/storage/product/image/${row.photo}`} /></td>
                                                    <td>
                                                        <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                            <PencilFill/>
                                                        </Link>
                                                        <Button variant="danger" onClick={() => deleteProduct(row.id)}>
                                                            <ArchiveFill />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Pagination prevPage={prevPage} changeCPage={changeCPage} nextPage={nextPage} 
              currentPage={currentPage} numbers={numbers} npage={npage}/>
                    </div>
                </div>
            </div>
        </div>
    )

    function prevPage() {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1)
        }
    
      }
      function nextPage() {
        if (currentPage !== npage) {
          setCurrentPage(currentPage + 1)
        }
    
      }
      function changeCPage(id) {
        setCurrentPage(id);
      }
    
}