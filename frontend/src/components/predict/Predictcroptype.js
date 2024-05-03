import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import state from "../../api/state_croptype.json";
import district from "../../api/district.json";
import season from "../../api/season_crop_predict.json";
import Button from 'react-bootstrap/Button';
import { PredictCropType } from '../../api/predictcroptype';

export default function Predictcroptype() {

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [predictionResult, setPredictionResult] = useState('');

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    // Reset district when state changes
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
  };

  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
  };

  const handleSubmit = async () => {
    const predictionData = {
      State_Name: selectedState,
      District_Name: selectedDistrict,
      Season: selectedSeason
    };

    try {
      const result = await PredictCropType(predictionData);
      setPredictionResult(result.answer);
    } catch (error) {
      console.error(error);
    }
  };

  // Extracting state and district data
  const states = Object.keys(state);
  const districts = state[selectedState] || [];

  return (
    <Container>
      <h1 className='h1-pred-crop'>CROP PREDICTION</h1>
      <br />
      <br />
      <Row className="justify-content-md-center">
        <Col>
          <div className="form-container">
            <h2>Fill up the details (all details are compulsory to fill)</h2>
            <div className="form-group">
              <label htmlFor="stateDropdown">State:</label>
              <select className="form-control" id="stateDropdown" onChange={handleStateChange}>
                <option value="" selected disabled hidden>Select State</option>
                {states.map((stateName, index) => (
                  <option key={index} value={stateName}>{stateName}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="districtDropdown">District:</label>
              <select className="form-control" id="districtDropdown" onChange={handleDistrictChange}>
                <option value="" selected disabled hidden>Select District</option>
                {districts.map((districtName, index) => (
                  <option key={index} value={districtName}>{districtName}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="seasonDropdown">Season:</label>
              <select className="form-control" id="seasonDropdown" onChange={handleSeasonChange}>
                <option value="" selected disabled hidden>Select Season</option>
                {Object.keys(season).map((seasonName, index) => (
                  <option key={index} value={seasonName}>{seasonName}</option>
                ))}
              </select>
            </div>

            <Button variant="primary mb-2 mt-2" onClick={handleSubmit}>Submit</Button>

            <br />
            <p>
              <h3>Crop Type: {predictionResult}</h3>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
