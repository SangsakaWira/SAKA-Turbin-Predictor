import React from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Image,
  Spinner,
  Alert
} from "react-bootstrap";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      status: "not_predicted",
      result: "",
      air_pressure:"",
      temperature_enclosure:"",
      pcd:"",
      actual_fuel_flow:"",
      generator:"",
      t1_temperature:"",
      turbine_air_inlet:"",
      gas_fuel_temp:""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler = async (event) => {
    event.preventDefault()

    const params = {
      "air_pressure":this.state.air_pressure,
      "temperature_enclosure":this.state.temperature_enclosure,
      "pcd":this.state.pcd,
      "actual_fuel_flow":this.state.actual_fuel_flow,
      "generator":this.state.generator,
      "t1_temperature":this.state.t1_temperature,
      "turbine_air_inlet":this.state.turbine_air_inlet,
      "gas_fuel_temp":this.state.gas_fuel_temp
    }
    let response = await axios.post("http://178.128.53.193:3500/predict_post",params).then(doc => {
      console.log(doc.data)
      return doc
    }).catch(err => {

    })

     this.setState({
       result:response.data.result
    })
    
  }

  onChangeHandler = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
    console.log(this.state)
  }


  render() {
    let hasil;
    if (this.state.result !== "") {
      // hasil = <Spinner animation="border" style={{ marginTop: "10px" }} />;
      hasil = (
        <Alert variant="success" style={{ marginTop: "10px", marginBottom:"10px"}}>
          <Alert.Heading>Hasil Prediksi Model Anda: </Alert.Heading>
          <p>
            {this.state.result+" "}<strong>kW</strong>
          </p>
        </Alert>
      );
    } else if (this.state.result !== "") {
      hasil = (
        <Alert variant="success" style={{ marginTop: "10px", marginBottom:"10px", width:"50%" }}>
          <Alert.Heading>Hasil Prediksi Model Anda: </Alert.Heading>
          <p>
            {this.state.result}<strong>kW</strong>
          </p>
        </Alert>
      );
    } else {
      hasil = <div />;
    }
    return (
      <div className="App">
        <Container>
          <h1 style={{ marginTop: "10px" }}>
            Prediksi Kapasitas Turbin PT SAKA
          </h1>
          <Image
            src="https://2.bp.blogspot.com/-TH2uP1gy4mw/WRnDbVrVggI/AAAAAAAAAsc/K-dj6ga-sMkJIbc_icmWYdN2hPP_I5XdgCLcB/s1600/pgn%2Bsaka.png"
            style={{ width: "50%", padding: "2%" }}
          />
          
          {hasil}
          <Form style={{ textAlign: "left", marginBottom: "10px" }} onSubmit={this.onClickHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Air Supply Pressure</Form.Label>
              <Form.Control
                type="text"
                name="air_pressure"
                placeholder="Range antara 7.00 - 8.00"
                onChange={this.onChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Temperature Enclosure</Form.Label>
              <Form.Control
                type="text"
                name="temperature_enclosure"
                placeholder="Range antara 25.0 - 40.0"
                onChange={this.onChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>PCD</Form.Label>
              <Form.Control type="text"
                name="pcd"
                onChange={this.onChangeHandler}
                placeholder="Range antara 6.5 - 7.5" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Actual Fuel Flow</Form.Label>
              <Form.Control type="text"
                name="actual_fuel_flow"
                onChange={this.onChangeHandler}
                placeholder="Range antara 300 - 600" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Generator Total</Form.Label>
              <Form.Control type="text"
                name="generator"
                onChange={this.onChangeHandler}
                placeholder="Range antara 300 - 900" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>T1 Temperature</Form.Label>
              <Form.Control
                type="text"
                name="t1_temperature"
                onChange={this.onChangeHandler}
                placeholder="Range antara 24.0 - 30.0"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Gas Fuel Temperature</Form.Label>
              <Form.Control
                type="text"
                name="gas_fuel_temp"
                onChange={this.onChangeHandler}
                placeholder="Range antara 40.0 - 50.0"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Turbin Air Inlet</Form.Label>
              <Form.Control
                type="text"
                name="turbine_air_inlet"
                onChange={this.onChangeHandler}
                placeholder="Range antara 10.0 - 15.00"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Predict
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
