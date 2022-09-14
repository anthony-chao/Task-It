import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import Dnd from './Calendar';
import Chat from '../chat/chat';
import { connect } from "react-redux";
// import { fetchUserProjects, fetchProject, fetchProjects } from '../../actions/projectActions';
import LoadingContainer from "../util/LoadingContainer";
// import { openModal } from "../../actions/modalActions";
// import dashboardGif from '../../assets/images/dashboard.gif'
// import { FcTodoList, FcCheckmark  } from 'react-icons/fc';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaAngellist } from 'react-icons/fa';
import anthony from '../../assets/images/profile-photos/anthony.jpg';
import andrea from '../../assets/images/profile-photos/andrea.jpg';
import andy from '../../assets/images/profile-photos/andy.jpg';
import michael from '../../assets/images/profile-photos/michael.jpg';

// const Dashboard = (props) => {

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     props.fetchUserProjects(props.currentUserId).finally(() => setIsLoading(false));
//   }, []);

//   // if (!props.project) {
//   //   openModal('createProject')
//   // }
//   // else {
//   //   return null;
//   // }

//   // useEffect(() => {
//   //   const intervalId = setTimeout(() => setIsLoading(isLoading), 1000);

//   //   return () => {
//   //     clearTimeout(intervalId);
//   //   }
//   // }, []);

//   const data = [
//     {
//       heading: "Dashboard",
//       body: <Task project={props.project}/>,
//     },
//     {
//       heading: "Calendar",
//       body: "Calendar content",
//     },
//     // {
//     //   heading: "Group Channel",
//     //   body: <Chat />,
//     // },
//   ];

//   const [info, setInfo] = useState({
//     data
//   })
  
//   let progressChart;
  
//   const content = () => {
//     return (
//       <div className="dashboard-container">
//         <Tabs className="tab-component">
//           <TabList>
//             {data.map(({ heading }, i) => (
//               <Tab key={i}>
//                 {heading}
//                 {i === 0 ? progressChart = <Chart /> : null}
//                 {/* {console.log(`${i}`)}
//                 {console.log(`${heading}`)} */}
//               </Tab>
//             ))}
//           </TabList>
          
//           <div className="main-content-container">
//             <div className="left-content">
//               <div className="task-container">
//                 <ul>
//                   <span><FcTodoList id="todo-icon" size={30} />TO DO:</span>
//                     <ol>Task 1 <FcCheckmark /></ol>
//                     <ol>Task 2  <FcCheckmark /></ol>
//                     <ol>Task 3  <FcCheckmark /></ol>
//                     <ol>Task 4  <FcCheckmark /></ol>
//                     <ol>Task 5  <FcCheckmark /></ol>
//                 </ul>
//               </div>
          
//               <div className="chart-container">
//                 {progressChart}
//                 {/* {console.log('Chart will render')} */}
//               </div>
//             </div>
          
//           {!props.project ? 
//             <div className="right-content-dashboard">  
//               <p>Uhh-ohh..Select/Create a Project first!</p> 
//               <img id="dashboard-gif" src={dashboardGif} alt="" /> 
//             </div>: 
//             <div className="right-content">
//               {data.map(({ body }, i) => (
//                 <TabPanel key={i}>
//                   {body}
//                 </TabPanel>
//               ))}
//             </div>
//             }

//           </div>
//         </Tabs>

//         <>
//           <Chat />
//         </>
//       </div>
//     )
//   }


// return isLoading ? <LoadingContainer /> : content() 
// }
// const mapStateToProps = (state, ownProps) => {
//   const project = state.entities.projects[ownProps.location.pathname.split("/")[3]]
  
//   if (!project) {
    
//   }
//   return {
//     userProjects: Object.values(state.entities.projects),
//     currentUserId: state.session.user.id,
//     project: state.entities.projects[ownProps.location.pathname.split("/")[3]]
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   fetchUserProjects: (userId) => dispatch(fetchUserProjects(userId)),
//   fetchProject: (projectId) => dispatch(fetchProject(projectId)),
//   fetchProjects: () => dispatch(fetchProjects())
// })

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

const Home = () => {
  return (
    <main className="home-container">
      <section className="instructions-container">
        <p>
          Instructions go here
        </p>
      </section>

      <section className="about-us-container">
        <div className="anthony">
          <div className="photo-container">
            <img src={anthony} alt="anthony-profile" />
          </div>
          <div className="socials">
            <a href="https://github.com/anthony-chao" target="_blank" rel="noopener noreferrer">
              <BsGithub id="social-link" />
            </a>
            <a href="https://www.linkedin.com/in/anthony-chao-cpa-983299133/" target="_blank" rel="noopener noreferrer">
              <BsLinkedin id="social-link" />
            </a>
            <a href="https://angel.co/u/anthony-chao-1" target="_blank" rel="noopener noreferrer">
              <FaAngellist id="social-link" />
            </a>
          </div>
        </div>

        <div className="andrea">
          <div className="photo-container">
            <img src={andrea} alt="andrea-profile" />
          </div>
          <div className="socials">
            <a href="https://github.com/pa-dg" target="_blank" rel="noopener noreferrer">
              <BsGithub id="social-link" />
            </a>
            <a href="https://www.linkedin.com/in/patricia-deguzman/" target="_blank" rel="noopener noreferrer">
              <BsLinkedin id="social-link" />
            </a>
            <a href="https://angel.co/" target="_blank" rel="noopener noreferrer">
              <FaAngellist id="social-link" />
            </a>
          </div>
        </div>

        <div className="andy">
          <div className="photo-container">
            <img src={andy} alt="andrea-profile" />
          </div>
          <div className="socials">
            <a href="https://github.com/pa-dg" target="_blank" rel="noopener noreferrer">
              <BsGithub id="social-link" />
            </a>
            <a href="https://www.linkedin.com/in/patricia-deguzman/" target="_blank" rel="noopener noreferrer">
              <BsLinkedin id="social-link" />
            </a>
            <a href="https://angel.co/" target="_blank" rel="noopener noreferrer">
              <FaAngellist id="social-link" />
            </a>
          </div>
        </div>

        <div className="michael">
          <div className="photo-container">
            <img src={michael} alt="andrea-profile" />
          </div>
          <div className="socials">
            <a href="https://github.com/pa-dg" target="_blank" rel="noopener noreferrer">
              <BsGithub id="social-link" />
            </a>
            <a href="https://www.linkedin.com/in/patricia-deguzman/" target="_blank" rel="noopener noreferrer">
              <BsLinkedin id="social-link" />
            </a>
            <a href="https://angel.co/" target="_blank" rel="noopener noreferrer">
              <FaAngellist id="social-link" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;