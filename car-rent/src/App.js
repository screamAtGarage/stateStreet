import logo from './logo.svg';
import './App.css';
import React, { useState, Component } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {


  state = {
      cars: []
    };

    async componentDidMount() {
      const response = await fetch('/cars');
      const body = await response.json();
      this.setState({cars: body});
    };

    render() {
       // const [startDate, setStartDate] = useState(new Date());
       // const  [endDate, setEndDate] = useState(new Date());
        const {cars} = this.state;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          basic rent a car app
        </p>
        <h3>cars</h3>
        <div>
                      {cars.map(car =>
                          <div key={car.id}>
                            {car.name} {car.type}
                          </div>
                      )}
                    </div>
        </header>
    </div>
  );
}
}

export default App;
