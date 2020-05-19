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
      status: "not_predicted"
    };
  }

  render() {
    let hasil;
    if (false) {
      hasil = <Spinner animation="border" style={{ marginTop: "10px" }} />;
    } else if (false) {
      hasil = (
        <Alert variant="success" style={{ marginTop: "10px" }}>
          <Alert.Heading>Hasil Prediksi Model Anda: </Alert.Heading>
          <p>
            2344.4324 <strong>kW</strong>
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
          <Form style={{ textAlign: "left", marginBottom: "10px" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Air Supply Pressure</Form.Label>
              <Form.Control
                type="text"
                placeholder="Range antara 7.00 - 8.00"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Temperature Enclosure</Form.Label>
              <Form.Control
                type="text"
                placeholder="Range antara 25.0 - 40.0"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>PCD</Form.Label>
              <Form.Control type="text" placeholder="Range antara 6.5 - 7.5" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Actual Fuel Flow</Form.Label>
              <Form.Control type="text" placeholder="Range antara 300 - 600" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Generator Total</Form.Label>
              <Form.Control type="text" placeholder="Range antara 300 - 900" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>T1 Temperature</Form.Label>
              <Form.Control
                type="text"
                placeholder="Range antara 24.0 - 30.0"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Gas Fuel Temperature</Form.Label>
              <Form.Control
                type="text"
                placeholder="Range antara 40.0 - 50.0"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Turbin Air Inlet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Range antara 10.0 - 15.00"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Predict
            </Button>
          </Form>
          {hasil}
        </Container>
      </div>
    );
  }
}
