import React, { useEffect,useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { meta } from "../../content_option";
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Lightbox, { ImagesListType } from 'react-spring-lightbox';

const images: ImagesListType = [
  {
    src: 'https://timellenberger.com/static/blog-content/dark-mode/win10-dark-mode.jpg',
    loading: 'lazy',
    alt: 'Windows 10 Dark Mode Setting',
  },
  {
    src: 'https://timellenberger.com/static/blog-content/dark-mode/macos-dark-mode.png',
    loading: 'lazy',
    alt: 'macOS Mojave Dark Mode Setting',
  },
  {
    src: 'https://timellenberger.com/static/blog-content/dark-mode/android-9-dark-mode.jpg',
    loading: 'lazy',
    alt: 'Android 9.0 Dark Mode Setting',
  },
];

export const Portfolio = ({ projects }) => {
  const [projectItems, setProjectItems] = useState([]);
  const [select, setSelect] = useState("All");
  const [modalOpen, setModalOpen] = useState(true);

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
  
  useEffect(() => {
    Promise.all(projects.map(image => loadImage(image.images.cover)))
      .then(() => setProjectItems(projects))
      .catch(err => console.log("Failed to load images", err))
  }, [projects]);


  function dropdownSelect(item) {
    setSelect(item)
    setProjectItems(item == "All" ? projects : projects.filter(x => x.type == item))
  }

  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);
  
  const onClose = () => {
    setModalOpen(false)
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
        <Navbar variant="dark" bg="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">Filter projects by: </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={select}
                  menuVariant="dark"
                >
                  <NavDropdown.Item onClick={() => dropdownSelect("All")} href="#action/3.3">All</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dropdownSelect("Javascript")} href="#action/3.1">Javascript</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dropdownSelect("Java")} href="#action/3.2">Java</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dropdownSelect("React Native")} href="#action/3.3">React Native</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dropdownSelect("React")} href="#action/3.3">React</NavDropdown.Item>
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
          projectItems.length == 0
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
                      <Link to="/projectDetails">View Project</Link>
                    </div>
                  </div>
                );
              })}
            </div>
        }
        <Lightbox
          isOpen={modalOpen}
          onPrev={gotoPrevious}
          onNext={gotoNext}
          images={images}
          currentIndex={currentImageIndex}
        /* Add your own UI */
        // renderHeader={() => (<CustomHeader />)}
        // renderFooter={() => (<CustomFooter />)}
        renderPrevButton={() => (<CustomLeftArrowButton />)}
        renderNextButton={() => (<CustomRightArrowButton />)}
        // renderImageOverlay={() => (<ImageOverlayComponent >)}

        /* Add styling */
        // className="cool-class"
        // style={{ background: "grey" }}

        /* Handle closing */
        onClose={onClose}

        /* Use single or double click to zoom */
        // singleClickToZoom

        /* react-spring config for open/close animation */
        // pageTransitionConfig={{
        //   from: { transform: "scale(0.75)", opacity: 0 },
        //   enter: { transform: "scale(1)", opacity: 1 },
        //   leave: { transform: "scale(0.75)", opacity: 0 },
        //   config: { mass: 1, tension: 320, friction: 32 }
        // }}
        />

      </Container>
    </HelmetProvider>
  );
};

const CustomLeftArrowButton = () => {
  return (<Link to="/projectDetails">View Project</Link>)
}

const CustomRightArrowButton = () => {
  return (<Link to="/projectDetails">View Project</Link>)
}