import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { meta } from "../../content_option";
import { RingLoader } from 'react-spinners';
import { useParams } from "react-router-dom";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as Reference, get,child } from "firebase/database";
import Carousel from 'react-bootstrap/Carousel';


export const ProjectDetails = () => {

  const [ProjectTitle, setProjectTitle] = useState('');
  const [ImagesList, setImagesList] = useState([]);
  const [Project, setProject] = useState({});

  let params = useParams()
  const storage = getStorage();

  useEffect(() => {
    let title = params.title.split("_")[0]
    let index = params.title.split("_")[1]
    setProjectTitle(title)
    loadImages(title)
    loadProjectDetails(index)
  }, []);

  const loadProjectDetails = (index) => {
    const dbRef = Reference(getDatabase());
    get(child(dbRef, `projects/${index}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setProject(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  const loadImages = async (projectTitle) => {
    const listRef = ref(storage, projectTitle + '/');
    let temp = []
    await listAll(listRef).then((res) => {
      res.items.forEach(async (itemRef) => {
        getDownloadURL(itemRef)
          .then((url) => {
            temp = [...temp, url]
          }).finally(() => {
            setImagesList(temp); 
            //  setLoading(false)
          })
      });
    })
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
            <h1 className="display-4 mb-4"> {ProjectTitle} </h1>
            <h5 style={{ color:"#00B1E1"}}><b>{Project.technologies}</b></h5>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            
            <h3 className="color_sec py-4 display-linebreak">
              {Project.description}
            </h3>
          </Col>
          <Col>
            <Carousel>
              {
                ImagesList.map((data, i) => {
                  return (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        // style={{maxHeight:'500px' }}
                        src={data}
                        alt="First slide"
                      />
                      {/* <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  )
}