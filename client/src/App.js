import React, {useEffect, useState} from 'react'
import { jwtDecode } from "jwt-decode";
import './App.css';
import {Navbar, Nav, Container, FormSelect} from "react-bootstrap"
import {Helmet} from "react-helmet"
import Dropdown from "react-bootstrap/Dropdown";
import Button from 'react-bootstrap/Button';


function App() {

  const [user, setUser] = useState({})

  const [backendData, setBackendData] = useState([])

  const [query, setQuery] = useState()

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: "+response.credential)
    var userObject = jwtDecode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById("signInDiv").hidden = true
    document.getElementById("signOutDiv").hidden = false
  }

  function handleSignOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false
    document.getElementById("signOutDiv").hidden = true
  }
  
  function findStudents() {
    let query = ""
    var firstOption = document.getElementById("gradeLevel")
    var gradeLevel = firstOption.options[firstOption.selectedIndex].value
    if(!(gradeLevel === "None")){
      query += "?gradeLevel=" + gradeLevel
    }

    var secondOption = document.getElementById("calculatedRace")
    var calculatedRace = secondOption.options[secondOption.selectedIndex].value;
    if(!(calculatedRace === "None")){
      query += "?CalculatedRace=" + calculatedRace
    }

    var thirdOption = document.getElementById("economicallyDisadvantaged")
    var economicallyDisadvantaged = thirdOption.options[thirdOption.selectedIndex].value;
    if(!(economicallyDisadvantaged === "None")){
      query += "?EconomicallyDisadvantaged=" + economicallyDisadvantaged
    }

    var fourthOption = document.getElementById("hasDetentions")
    var hasDetentions = fourthOption.options[fourthOption.selectedIndex].value;
    if(!(hasDetentions === "None")){
      query += "?Conduct:HasDetentions=" + economicallyDisadvantaged
    }

    var fifthOption = document.getElementById("overNineAbsences")
    var overNineAbsences = fifthOption.options[fifthOption.selectedIndex].value;
    if(!(overNineAbsences === "None")){
      query += "?Att:Has09DayAbsLtr=" + overNineAbsences
    }

    var sixthOption = document.getElementById("overFourUnexcused")
    var overFourUnexcused = sixthOption.options[sixthOption.selectedIndex].value;
    if(!(overFourUnexcused === "None")){
      query += "?Att:Has04DayUxAbsLtr=" + overFourUnexcused
    }

    console.log(query)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "281737967662-u1vbtb5gfano89kkl8e1j6f310d6o508.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large", }
    )

    google.accounts.id.prompt()

    fetch("/api?grade=11").then(
      response => response.json()
    ).then(
      data => {
        console.log(typeof data)
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      <Navbar id = "Navbar" bg="dark" data-bs-theme="dark">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                  <Helmet>
              <style>{'body { background-color: lightblue; }'}</style>
              </Helmet>

              <h1 id = "InitialHeading"> SBHS Attendance Analytics </h1>
              </li>
          </ul>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ms-auto">
                <li id = "google" class="nav-item">
                  <div id="signInDiv"></div>
                  <div id="signOutDiv" hidden>
                  { Object.keys(user).length != 0 &&
                    <button id = "signOutButton" onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                  }
                  {user &&
                    <div>
                      <img id = "userPicture" src={user.picture}></img>
                      <h3 id = "username">{user.name}</h3>
                    </div>
                  }
                  </div>
                </li>
            </ul>
        </div>
      </Navbar>

      <br></br>
      <br></br>
      <br></br>

      <div class = "container">
        <div class = "row">
          <div class = "col-lg-6">
            <div class = "well">
              <h2 id = "dataHeading">Find Students</h2>
              <div class = "btn-group">
                <div class = "select">
                  <p>Grade Level</p>
                  <select id = "gradeLevel" class="form-select" aria-label="Default select example">
                    <option selected>None</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>

                <div class = "select">
                  <p class = "selectParagraph">Calculated Race</p>
                  <select id = "calculatedRace" class="form-select" aria-label="Default select example">
                    <option selected>None</option>
                    <option value="1">White</option>
                    <option value="2">Asian</option>
                    <option value="3">Multiple Races</option>
                    <option value="4">Black</option>
                    <option value="5">Hispanic</option>
                  </select>
                </div>

                <div class = "select">
                <p class = "selectParagraph">Economically Disadvantaged</p>
                  <select id = "economicallyDisadvantaged" class="form-select" aria-label="Default select example">
                    <option selected>None</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </select>
                </div>

                <div class = "select">
                <p class = "selectParagraph">Has Detentions</p>
                  <select id = "hasDetentions" class="form-select" aria-label="Default select example">
                    <option selected>None</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </select>
                </div>

                <div class = "select">
                <p class = "selectParagraph">Over 9 Absences</p>
                  <select id = "overNineAbsences" class="form-select" aria-label="Default select example">
                    <option selected>None</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </select>
                </div>

                <div class = "select">
                <p class = "selectParagraph">Over 4 Unexcused Absences</p>
                  <select id = "overFourUnexcused" class ="form-select" aria-label="Default select example">
                    <option selected>None</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </select>
                </div>

              </div>

            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <Button onClick = { (e) => findStudents(e)} id = "submitButton" variant="outline-light">Submit</Button>
      </div>

      {(typeof backendData == 'undefined') ? (
        <p>Loading ...</p>
      ): (
        backendData.map((student, i) => 
        <p key = {i} >{student.FirstName} {student.LastName} Grade: {student.GradeLevel}</p>
        )
      )}
    </div>

  )

}

export default App