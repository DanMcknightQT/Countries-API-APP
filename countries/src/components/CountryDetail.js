import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {BiArrowBack} from 'react-icons/bi'


function CountryDetail() {

  const [country, setCountry] = useState([])
  const [loading, setLoading] = useState(true)
  const [bordered, setBordered] = useState(true)
  const {cioc} = useParams()
  const URL = `https://restcountries.com/v3.1/alpha/${cioc}`
  const navigate = useNavigate()
  


  useEffect(async()=>{
    const res = await fetch(URL)
    const data = await res.json()
    console.log(data)
    if(data[0].borders === undefined){
      setBordered(false)
    }
    console.log(data[0].borders)
    console.log(bordered, 'bordered')
    setCountry(data)
    setLoading(false)
  },cioc)
  
 if(loading){
   return <div>Loading...</div>
 }
 
  return (
    <>
      <Header />



      <section className='d-flex flex-row justify-content-start' style={{marginLeft:'15px'}}>
        <Button style={{backgroundColor:'white'}} onClick={()=>navigate(-1)}><BiArrowBack/><span style={{color:'black'}}>BACK</span></Button>
      </section>

      <br></br>

      <Row>
        {country.map((country)=>{
          const {flags, name, population, region, subregion, capital, tld, currencies, languages , borders}=country
          return(
            <Col md="auto" key={country}>
              <Card>
                <Card.Img src={flags.svg} alt={name.common}/>
              </Card>
              <section>
                <Card>
                  <Card.Title>{name.common}</Card.Title>
                  <Card.Text>Native Name: {name.official}</Card.Text>
                  <Card.Text>Population: {population}</Card.Text>
                  <Card.Text>Region: {region}</Card.Text>
                  <Card.Text>Sub Region: {subregion}</Card.Text>
                  <Card.Text>Capital: {capital}</Card.Text>
                  <Card.Text>Top Level Domain: {tld[0]}</Card.Text>
                  <Card.Text>Currencies: {Object.keys(currencies)}</Card.Text>
                  <Card.Text>Languages: {Object.values(languages)}</Card.Text>
                </Card>
                <Card>
                  <div className="d-flex flex-row justify-content-around">
                    Border Countries:
                    {bordered ? borders.map((border)=>{
                      return(
                        <div key={border} className='d-flex flex-row justify-content-around'>
                          <Button onClick={()=>navigate(`/Details/${border}`)}>{border}</Button>
                        </div>
                      )
                    }) : 
                      <Card.Text> No Borders </Card.Text>
                    }
                  </div>
                </Card>
              </section>
            </Col>
          )
        })}
      </Row>

    </>
  )
}

export default CountryDetail