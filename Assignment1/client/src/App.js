import React from 'react';
import './App.css';

import IpInfo from './IpInfo';
import VisitorCount from './VisitorCount';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <p>
          <VisitorCount url="/visitorcount"/>
          <IpInfo ipaddressurl = "/ipaddress"/>
        </p>
      </header>

      <footer>
        <span>
          Contact n10627928@qut.edu.au for any inquiries.
          <br />
          Copyright &copy; 2022. All Rights Reserved.
          <br />
          Credits to ip-api.com and ipapi.co for use of API
        </span>
      </footer>
      
    </div>
  );
}

export default App;
