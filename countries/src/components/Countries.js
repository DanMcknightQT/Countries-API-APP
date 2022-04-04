import React from 'react'
import {useState, useEffect} from 'react'
import Error from './Error'
import {Link} from 'react-router-dom'
import Header from './Header'
import Filters from './Filters'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import '../css/Countries.css'
import InputGroup from 'react-bootstrap/InputGroup'
import {BiSearch} from 'react-icons/bi'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

function Countries() {

    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(async() =>{
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        console.log(data)
        setCountry(data)
        setLoading(false)
    },[])

    const region = async region => {
        if(region === '') return
        const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        const data = await res.json()
        console.log(region,'region')
        setCountry(data)
    }

    const search = async search => {
        if( search === 'All') return
        const res = await fetch(`https://restcountries.com/v3.1/name/${search}`)
        const data = await res.json()
        console.log(data)
        console.log(data.status)
        if(data.status===404){
            setError(true)
            console.log(error)
        }else{
             setError(false)
             console.log(error)
        }
        console.log(search,'search')
        setCountry(data)
    }


    if(loading){
        return <div>Loading...</div>
    }
  
  return (
    <div>
        <Header />

        {/* <Filters search={search} region={region} setCountry={setCountry}/> */}
        
        <div className='d-flex flex-row justify-content-around'>
        <section>
          <InputGroup style={{width:"12rem"}} onChange={e => search(e.target.value)}>
            <InputGroup.Text><BiSearch/></InputGroup.Text>
            <FormControl
              placeholder="Search for a country..."
              style={{fontSize:'12px'}}
            />
          </InputGroup>
        </section>
        <section>
          <Form.Select aria-label="Default select example" style={{width:"12rem"}} onChange={(e) => region(e.target.value)}>
            <option value="All">Filter by region...</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </Form.Select>
        </section>
        </div>

        <Container className="d-flex flex-row justify-content-around">

         {
             error ? <Error/> : 
              <Row className="d-flex flex-row justify-content-around">
            {country.map( (country, index ) =>{
                const {cioc, flags, name, population,region, capital} = country
                
                return(
                    <Col md="auto">
                        <Link className='cardLink' style={{margin:'0px 5px 0px 5px'}} to={`/Details/${cioc}`} key={cioc}>
                            <Card style={{width:'18rem'}}>
                                <Card.Img style={{width:'18rem'},{height:'12rem'}} src={flags.svg} className="" alt={name.common} />
                                <Card.Body className="">
                                    <Card.Title className="cardText">{name.common}</Card.Title>
                                    <Card.Text className="cardText">Population: <span className="">{population}</span></Card.Text>
                                    <Card.Text className="cardText">Region: <span className="">{region}</span></Card.Text>
                                    <Card.Text className="cardText">Capital: <span className="">{capital}</span></Card.Text>  
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            }   
            )}
        </Row> 
         }
        </Container>

    </div>
  )
}

export default Countries