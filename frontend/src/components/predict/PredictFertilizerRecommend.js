import React, { useState } from 'react'
import "./pred.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import state from "../../api/state.json"
import district from "../../api/district.json"
import crop from "../../api/crop.json"
import season from "../../api/season.json";
import Button from 'react-bootstrap/Button';
import { PredictFertilizerRecommend } from '../../api/predictfertilizerrecommend';


let state_data = Object.keys(state)
let district_data = Object.keys(district)
let crop_data = Object.keys(crop)
let season_data = Object.keys(season)







export default function Predictfertilizerrecommend() {

const [Nitrogen, setNitrogen] = useState();
const [Phosporous, setPhosporous] = useState();
const [Potassium, setPotassium] = useState();
const [Temperature, setTemperature] = useState();
const [Humidity, setHumidity] = useState();
const [SoilMoisture, setSoilMoisture] = useState();
const [SoilType, setSoilType] = useState();
const [Crop, setCrop] = useState();
const [Ans, setAns] = useState();


const handleClick = async ()=>{

  let ans = {
    "nitrogen":Nitrogen,
    "phosporous":Phosporous,
    "potassium":Potassium,
    "temp":Temperature,
    "humidity":Humidity,
    "soilmoister":SoilMoisture,
    "soiltype":SoilType,
    "crop":Crop

    
  }

  try{
    let temp = await PredictFertilizerRecommend(ans);
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
      <h1 className='h1-pred-crop'>Fertilizer Recommendation</h1>
      <br/>
      <br/>
    <Row className="justify-content-md-center">
        <Col>
        <div class="form-container">
        <h2>Fill up the details (all details are compulsory to fill)</h2>
            

              <div class="form-outline mb-1" >
                <label class="form-label" for="typeNumber">Enter Nitrogen</label>
                <input value={Nitrogen} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setNitrogen(e.target.value)
                }}/>
              </div>

        
              <div class="form-outline mb-2" >
                <label class="form-label" for="typeNumber">Enter Phosporous</label>
                <input value={Phosporous} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setPhosporous(e.target.value)
                }}/>
              </div>

              <div class="form-outline mb-2" >
                <label class="form-label" for="typeNumber">Enter Potassium</label>
                <input value={Potassium} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setPotassium(e.target.value)
                }}/>
              </div>

              <div class="form-outline mb-2" >
                <label class="form-label" for="typeNumber">Enter Temperature</label>
                <input value={Temperature} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setTemperature(e.target.value)
                }}/>
              </div>

              <div class="form-outline mb-2" >
                <label class="form-label" for="typeNumber">Enter Humidity</label>
                <input value={Humidity} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setHumidity(e.target.value)
                }}/>
              </div>

              <div class="form-outline mb-2" >
                <label class="form-label" for="typeNumber">Enter Soil Moisture</label>
                <input value={SoilMoisture} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setSoilMoisture(e.target.value)
                }}/>
              </div>

              <div class="form-outline mb-2" >
                <label class="form-label" for="typeNumber">Enter Soil Type</label>
                <input value={SoilType} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setSoilType(e.target.value)
                }}/>
              </div>

              <div class="form-outline mb-2" >
                <label class="form-label" for="typeNumber">Enter Crop</label>
                <input value={Crop} type="number" id="typeNumber" class="form-control" onChange={(e)=>{
                  setCrop(e.target.value)
                }}/>
              </div>

              <Button variant="primary mb-2 mt-2" onClick={handleClick}>Submit</Button>

        <br/>
        <p>
          <h3>Yield : {Ans}</h3>
        </p>
    </div>
        </Col>
      </Row>
    </Container>

    </>
  )
}
