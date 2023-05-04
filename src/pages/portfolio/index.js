import React, { useEffect,useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { meta } from "../../content_option";
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, child, get } from "firebase/database";


export const Portfolio = () => {
  const [projectItems, setProjectItems] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropDisable, setDropDisable] = useState(true);
  const [select, setSelect] = useState("All");

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `projects/`)).then((snapshot) => {
      if (snapshot.exists()) {
        // setProjectItems(snapshot.val())
        setAllProjects(snapshot.val())
        Promise.all(snapshot.val().map(image => loadImage(image.images.cover)))
          .then(() => {
            setProjectItems(snapshot.val());
            setLoading(false)
            setDropDisable(false)
          })
          .catch(err => console.log("Failed to load images", err))
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      // setLoading(false)
      // setDropDisable(false)
    });
  }, []); 
  

  const loadImage = image => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image()
      loadImg.src = image
      // wait 2 seconds to simulate loading time
      loadImg.onload = () =>
        setTimeout(() => {
          resolve(image)
        }, 2000)
      loadImg.onerror = err => reject(err)
    })
  }


  const navigate = useNavigate();
  const navigateToProject = (title,index) => {
        navigate("/projectDetails/"+title+"_"+index)
  }
  
  // useEffect(() => {
  //   Promise.all(projects.map(image => loadImage(image.images.cover)))
  //     .then(() => setProjectItems(projects))
  //     .catch(err => console.log("Failed to load images", err))
  // }, [projects]);

  const dropdownSelect=(item)=>{
    console.log("run");
    setSelect(item)
    setProjectItems(item == "All" ? allProjects : allProjects.filter(x => x.type == item))
  }

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Navbar variant="dark" bg="dark" expand="lg" style={{marginBottom:10}}>
          <Container fluid>
            <Navbar.Brand href="#home">Filter projects by: </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={select}
                  menuVariant="dark"
                  disabled={dropDisable}
                >
                  <NavDropdown.Item onClick={() => dropdownSelect("All")} href="#action/3.3">All</NavDropdown.Item>
                  {/* <NavDropdown.Item onClick={() => dropdownSelect("Javascript")} href="#action/3.1">Javascript</NavDropdown.Item> */}
                  <NavDropdown.Item onClick={() => dropdownSelect("Java")} href="#action/3.2">Java</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dropdownSelect("React Native")} href="#action/3.3">React Native</NavDropdown.Item>
                  {/* <NavDropdown.Item onClick={() => dropdownSelect("React")} href="#action/3.3">React</NavDropdown.Item> */}
                  <NavDropdown.Item onClick={() => dropdownSelect("Swift")} href="#action/3.3">Swift</NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                  {/* <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {
          loading
            ? 
            <div style={{ marginTop: 100 ,display:'flex' , flex:1, alignItems: "center", justifyContent:"center"}} >
              <RingLoader color={'#00ccb1'} size={100} />
            </div>
            :
            <div className="mb-5 po_items_ho">
              {projectItems.map((data, i) => {
                return (
                  <div key={i} className="po_item">
                    <img style={{ aspectRatio: 1.52 }} src={data.images.cover} alt="" />
                    <div className="content">
                      <p>{data.title}</p>
                      <button onClick={() => { navigateToProject(data.title,i) }} type="button" className="btn btn-outline-light">View Project</button>
                    </div>
                  </div>
                );
              })}
              <div></div><div></div><div></div><div></div>
            </div>
        }
      </Container>
    </HelmetProvider>
  );
};
