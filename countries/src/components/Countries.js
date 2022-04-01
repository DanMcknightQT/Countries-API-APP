import React from 'react'
import {useState, useEffect} from 'react'
import CountryDetail from './CountryDetail'
import {Link} from 'react-router-dom'
import Header from './Header'
import Filters from './Filters'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import '../css/Countries.css'

function Countries() {
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async () =>{
      const res = await fetch('https://restcountries.com/v2/all')
      const data = await res.json()
      await console.log(data)
      await setCountry(data)
      await setLoading(false)
    },[])

   

    if(loading){
        return <div>Loading...</div>
    }
  
  return (
    <div>
        <Header />
        <Filters />
        <Container>
        <Row className="">
            {country.map( (country, index ) =>
                <Col md="auto">
                <Link className='cardLink' style={{margin:'0px 5px 0px 5px'}} to={{pathname : 'Details'}} name={country.name} key={index}>

                    <Card style={{width:'18rem'}}>
                        <Card.Img style={{width:'18rem'},{height:'12rem'}} src={country.flag} className="" alt={country.name} />
                        <Card.Body className="">
                            <Card.Title className="cardText">{country.name}</Card.Title>
                            <Card.Text className="cardText">Population: <span className="">{country.population}</span></Card.Text>
                            <Card.Text className="cardText">Region: <span className="">{country.region}</span></Card.Text>
                            <Card.Text className="cardText">Capital: <span className="">{country.capital}</span></Card.Text>  
                        </Card.Body>
                    </Card>
                </Link>
                </Col>
            )}
        </Row>
        </Container>

    </div>
  )
}

export default Countries