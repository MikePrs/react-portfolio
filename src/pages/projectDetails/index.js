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

export const ProjectDetails = () => {
  const [ProjectTitle, setProjectTitle] = useState('');
  const [ImagesList, setImagesList] = useState();

  let params = useParams()
  const storage = getStorage();

  useEffect(() => {
    setProjectTitle(params.title)
    loadImages(params.title)
  }, []);


  const loadImages = async (projectTitle) => {
    const listRef = ref(storage, projectTitle + '/');
    let temp = []
    listAll(listRef).then((res) => {
      res.prefixes.forEach((folderRef) => { });
      res.items.forEach(async (itemRef) => {
        getDownloadURL(itemRef)
          .then((url) => {
            temp = [...temp, url]
            console.log(url);
          }).finally(() => {
             setImagesList(temp)
            //  setLoading(false)
          })
      });
    })
    .catch((error) => {
      console.log(error);
    }).finally(() => {
      // setLoading(false)
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
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  )
}