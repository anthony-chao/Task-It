import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Chart from './Chart';
// import Dnd from './Calendar';

const Dashboard = (props) => {

  const data = [
    {
      heading: "Dashboard",
      body: "Dashboard content",
    },
    {
      heading: "Calendar",
      body: "Calendar content",
    },
    {
      heading: "Group Channel",
      body: "Group Channel content",
    },
  ];

  const [info, setInfo] = useState({
    data
  })
  
  let progressChart;
  
  // debugger
  return (
    <div className="dashboard-container">
      <Tabs className="tab-component">
        <TabList>
          {data.map(({ heading }, i) => (
            <Tab key={i}>
              {heading}
              {i === 0 ? progressChart = <Chart /> : null}
              {console.log(`${i}`)}
              {console.log(`${heading}`)}
            </Tab>
          ))}
        </TabList>
        
        <div className="main-content-container">
          <div className="left-content">
            <div className="task-container">
              <ul>
                <li>Task</li>
                <li>Task</li>
                <li>Task</li>
              </ul>
            </div>
        
            <div className="chart-container">
              {progressChart}
              {console.log('Chart will render')}
            </div>
          </div>
        
          <div className="right-content">
            {data.map(({ body }, i) => (
              <TabPanel key={i}>
                {body}
              </TabPanel>
            ))}
          </div>

        </div>
          

      </Tabs>
    </div>
  )
}

export default Dashboard;