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
import Carousel from 'react-bootstrap/Carousel';


export const ProjectDetails = () => {


  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);


  const [ProjectTitle, setProjectTitle] = useState('');
  const [ImagesList, setImagesList] = useState([]);

  let params = useParams()
  const storage = getStorage();

  useEffect(() => {
    setProjectTitle(params.title)
    loadImages(params.title)
  }, []);


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
      // .then(() => { setImagesList(temp);  })
    // .catch((error) => {
    //   console.log(error);
    // }).finally(() => {
    //   setImagesList(temp)
    //   // setLoading(false)
    // })
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
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row>
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
        </Row>
      </Container>
    </HelmetProvider>
  )
}