import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'

import {MdDarkMode} from 'react-icons/md'

function Header() {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar style={{borderBottom:'solid 2px #d3d3d3'}}>
        <Container>
          <Navbar.Brand style={{fontWeight:'bold'}} onClick={()=>navigate(`/`)}>Where in the World</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <button style={{border:'none'}}><MdDarkMode/> Dark Mode</button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
    </div>
  )
}

export default Header