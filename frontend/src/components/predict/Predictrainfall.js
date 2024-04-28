import React, { useState } from 'react'
import "./pred.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import region from "../../api/region.json"
import month from "../../api/month.json"
// import crop from "../../api/crop.json"
// import season from "../../api/season.json";
import Button from 'react-bootstrap/Button';
import { PredictRainFall } from '../../api/predictrainfall';


let region_data = Object.keys(region)
let month_data = Object.keys(month)
// let crop_data = Object.keys(crop)
// let season_data = Object.keys(season)







export default function Predictrainfall() {

const [Region, setRegion] = useState();
const [Month, setMonth] = useState();
const [Ans, setAns] = useState();


const handleClick = async ()=>{

  let ans = {
    "Region":Region,
    "Month":Month
  }

  try{
    let temp = await PredictRainFall(ans);
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
      <h1 className='h1-pred-crop'>RAINFALL PREDICTION</h1>
      <br/>
      <br/>
    <Row className="justify-content-md-center">
        <Col>
        <div class="form-container">
        <h2>Fill up the details (all details are compulsory to fill)</h2>
            <div class="form-group">
                <label for="myDropdown">Region:</label>
                <select class="form-control" id="myDropdown" name="Region" onChange={(e)=>{
                  setRegion(e.target.value)
                }}>
                    <option value="" selected disabled hidden>
                        Select Region
                    </option>
                    {region_data.map((element, index) => {
                      return <option value={element}>{element}</option>
                    })}
                </select>
             </div>

             <div class="form-group">
                <label for="myDropdown">Month:</label>
                <select class="form-control" id="myDropdown" name="Month" onChange={(e)=>{
                  setMonth(e.target.value)
                }}>
                    <option value="" selected disabled hidden>
                        Select Month
                    </option>
                    {month_data.map((element, index) => {
                      return <option value={element}>{element}</option>
                    })}
                </select>
              </div> 

        
           

              <Button variant="primary mb-2 mt-2" onClick={handleClick}>Submit</Button>

        <br/>
        <p>
          <h3>Result in mm : {Ans}</h3>
        </p>
    </div>
        </Col>
      </Row>
    </Container>

    </>
  )
}
