import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Chart from './Chart';
// import Dnd from './Calendar';
import Chat from '../chat/Chat';
import Task from '../task/Task'
import { connect } from "react-redux";
import { fetchUserProjects, fetchProject, fetchProjects } from '../../actions/projectActions';
import LoadingContainer from "../util/LoadingContainer";


const Dashboard = (props) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.fetchUserProjects(props.currentUserId).finally(() => setIsLoading(false));
  }, []);

  debugger;
  const data = [
    {
      heading: "Dashboard",
      body: <Task project={props.project}/>,
    },
    {
      heading: "Calendar",
      body: "Calendar content",
    },
    // {
    //   heading: "Group Channel",
    //   body: <Chat />,
    // },
  ];

  const [info, setInfo] = useState({
    data
  })
  
  let progressChart;
  
  const content = () => {
    return (
      <div className="dashboard-container">
        <Tabs className="tab-component">
          <TabList>
            {data.map(({ heading }, i) => (
              <Tab key={i}>
                {heading}
                {i === 0 ? progressChart = <Chart /> : null}
                {/* {console.log(`${i}`)}
                {console.log(`${heading}`)} */}
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
                {/* {console.log('Chart will render')} */}
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

        <>
          <Chat />
        </>
      </div>
    )
  }


return isLoading ? <LoadingContainer /> : content() 
}
const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    userProjects: Object.values(state.entities.projects),
    currentUserId: state.session.user.id,
    project: state.entities.projects[ownProps.location.pathname.split("/")[3]]
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserProjects: (userId) => dispatch(fetchUserProjects(userId)),
  fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  fetchProjects: () => dispatch(fetchProjects())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));