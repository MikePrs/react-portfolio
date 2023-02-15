import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { meta } from "../../content_option";
import { RingLoader } from 'react-spinners';

export const ProjectDetails = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
      </Container>
    </HelmetProvider>
  )
}