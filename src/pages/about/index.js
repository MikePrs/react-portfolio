import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button } from "react-bootstrap";
import { dataabout, meta, worktimeline, skills ,databaseSkills, versionControlSkills,projectTrackingSkills} from "../../content_option";
import { Link } from "react-router-dom";

export const About = () => {


  const onButtonClick = () => {
    fetch('my-cv.pdf').then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'MikeParaskevopoulos.pdf';
        alink.click();
      })
    })
  }



  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="3">
            <h3 className="color_sec py-4 display-linebreak">
              {dataabout.title}
            </h3>
          </Col>
          <Col lg="9" className="d-flex align-items-center">
            <div className="display-linebreak">
              <p>{dataabout.aboutme}</p>
              <div className="col-md-12 text-center">
                <Button onClick={onButtonClick} variant="outline-secondary">Download my CV</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="3">
            <h3 className="color_sec py-4">Work Timline</h3>
          </Col>
          <Col lg="9">
            <table className="table caption-top">
              <tbody>
                {worktimeline.map((data, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{data.jobtitle}</th>
                      {data.link ?
                        <td><a href={data.link} target="_blank">{data.where}</a></td>
                        :
                        <td>{data.where}</td>
                      }
                      <td>{data.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="3">
            <h3 className="color_sec py-4">Skills</h3>
          </Col>
          <Col lg="5">
            <h4 style={{paddingBlock:30}}>Programming Languages</h4>
            {skills.map((data, i) => {
              return (
                <div key={i}>
                  <h3 className="progress-title">{data.name}</h3>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${data.value}%`,
                      }}
                    >
                      <div className="progress-value">{data.value}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
          <Col lg="4">
            <h4 style={{ paddingBlock: 30 }}>Databases</h4>
            {databaseSkills.map((data, i) => {
              return (
                <div key={i}>
                  <h3 className="progress-title">{data.name}</h3>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${data.value}%`,
                      }}
                    >
                      <div className="progress-value">{data.value}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <h4 style={{ paddingBlock: 30 }}>Version Control</h4>
            {databaseSkills.map((data, i) => {
              return (
                <div key={i}>
                  <h3 className="progress-title">{data.name}</h3>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${data.value}%`,
                      }}
                    >
                      <div className="progress-value">{data.value}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <h4 style={{ paddingBlock: 30 }}>Project Tracking</h4>
            {projectTrackingSkills.map((data, i) => {
              return (
                <div key={i}>
                  <h3 className="progress-title">{data.name}</h3>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${data.value}%`,
                      }}
                    >
                      <div className="progress-value">{data.value}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
        {/* <Row className="sec_sp">
          <Col lang="5">
            <h3 className="color_sec py-4">services</h3>
          </Col>
          <Col lg="7">
            {services.map((data, i) => {
              return (
                <div className="service_ py-4" key={i}>
                  <h5 className="service__title">{data.title}</h5>
                  <p className="service_desc">{data.description}</p>
                </div>
              );
            })}
          </Col>
        </Row> */}
      </Container>
    </HelmetProvider>
  );
};
