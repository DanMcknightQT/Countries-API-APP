import React from 'react'
import {BiSearch} from 'react-icons/bi'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

function Filters(region, search) {


  return (
    <div>
      <div className='d-flex flex-row justify-content-around'>
        <section>
          <InputGroup style={{width:"12rem"}} onChange={(e) => search(e.target.value)}>
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
    </div>
  )
}

export default Filters