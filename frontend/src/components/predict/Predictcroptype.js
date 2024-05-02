import React, { useState } from 'react'
import "./pred.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import state from "../../api/state_croptype.json"
import district from "../../api/district.json"
import season from "../../api/season_crop_predict.json";
import Button from 'react-bootstrap/Button';
import { PredictCropType } from '../../api/predictcroptype';


let state_data = Object.keys(state)
let district_data = Object.keys(district)
let season_data = Object.keys(season)

export default function Predictcroptype() {

const [State, setState] = useState();
const [District, setDistrict] = useState();
const [Season, setSeason] = useState();
const [Ans, setAns] = useState();

const handleClick = async ()=>{

  let ans = {
    "State_Name":State,
    "District_Name":District,
    "Season":Season
  }

  try{
    let temp = await PredictCropType(ans);
    // console.log(Ans);
    setAns(temp.answer);
  }
  catch(error){
    console.log(error)
  }
}

  return (
    <>
    <Container>
      <h1 className='h1-pred-crop'>CROP PREDICTION</h1>
      <br/>
      <br/>
    <Row className="justify-content-md-center">
        <Col>
        <div class="form-container">
        <h2>Fill up the details (all details are compulsory to fill)</h2>
            <div class="form-group">
                <label for="myDropdown">State:</label>
                <select class="form-control" id="myDropdown" name="State_Name" onChange={(e)=>{
                  setState(e.target.value)
                }}>
                    <option value="" selected disabled hidden>
                        Select State
                    </option>
                    {state_data.map((element, index) => {
                      return <option value={element}>{element}</option>
                    })}
                </select>
             </div>

             <div class="form-group">
                <label for="myDropdown">District:</label>
                <select class="form-control" id="myDropdown" name="District_Name" onChange={(e)=>{
                  setDistrict(e.target.value)
                }}>
                    <option value="" selected disabled hidden>
                        Select District
                    </option>
                    {district_data.map((element, index) => {
                      return <option value={element}>{element}</option>
                    })}
                </select>
              </div> 

              <div class="form-group">
                <label for="myDropdown">Season:</label>
                <select class="form-control" id="myDropdown" name="Season" onChange={(e)=>{
                  setSeason(e.target.value)
                }}>
                    <option value="" selected disabled hidden>
                        Select Season
                    </option>
                    {season_data.map((element, index) => {
                      return <option value={element}>{element}</option>
                    })}
                </select>
              </div>

              <Button variant="primary mb-2 mt-2" onClick={handleClick}>Submit</Button>

        <br/>
        <p>
          <h3>Crop Type : {Ans}</h3>
        </p>
    </div>
        </Col>
      </Row>
    </Container>

    </>
  )
}






