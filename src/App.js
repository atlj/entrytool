import React from "react";
import "./styles.css";
import { saveAs } from "@progress/kendo-file-saver";
import { ReactSVG } from "react-svg";
import clipbord from "copy-to-clipboard";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Badge,
  ButtonGroup,
  Modal,
  Alert
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CategoryCommonMistakesIcon,
  CategoryGeneralIcon,
  CategoryHealthyHabitsIcon,
  CategoryImmunityIcon,
  CategoryNutritionIcon,
  CategoryStayYoungIcon,
  CategoryStressManagementIcon
} from "./icons";

export default function App() {
  const dateobject = new Date();
  const [addbuttonstatus, setaddbuttonstatus] = React.useState(true);
  const [totalcount, settotalcount] = React.useState(0);
  const [content, setContent] = React.useState("");
  const [ContentList, setContentList] = React.useState([]);
  const [category, setCategory] = React.useState("General");
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ChangeCategory = (data) => {
    setCategory(data.target.value);
  };

  const addbuttontimer = () => {
    setaddbuttonstatus(false);
    setTimeout(() => setaddbuttonstatus(true), 1000);
  };

  const seticon = (category) => {
    switch (category) {
      case "Stay Young":
        return (
          <ReactSVG
            style={{ marginLeft: 4, marginRight: 9, height: 30, width: 30 }}
            src={CategoryStayYoungIcon}
          />
        );
      default:
        return (
          <ReactSVG
            style={{ marginLeft: 4, marginRight: 9, height: 30, width: 30 }}
            src={CategoryGeneralIcon}
          />
        );
      case "Common Mistakes":
        return (
          <ReactSVG
            style={{ marginLeft: 4, marginRight: 9, height: 30, width: 30 }}
            src={CategoryCommonMistakesIcon}
          />
        );
      case "Immunity":
        return (
          <ReactSVG
            style={{ marginLeft: 4, marginRight: 9, height: 30, width: 30 }}
            src={CategoryImmunityIcon}
          />
        );
      case "Nutrition":
        return (
          <ReactSVG
            style={{ marginLeft: 4, marginRight: 9, height: 30, width: 30 }}
            src={CategoryNutritionIcon}
          />
        );
      case "Healthy Habits":
        return (
          <ReactSVG
            style={{ marginLeft: 4, marginRight: 9, height: 30, width: 30 }}
            src={CategoryHealthyHabitsIcon}
          />
        );
      case "Stress Management":
        return (
          <ReactSVG
            style={{ marginLeft: 4, marginRight: 9, height: 30, width: 30 }}
            src={CategoryStressManagementIcon}
          />
        );
    }
  };

  const CopytoClipboard = () => {
    clipbord(JSON.stringify(ContentList));
  };
  const RemoveContent = (key) => {
    let templist = [];
    ContentList.forEach((element) => {
      if (element.key === key) {
      } else {
        templist = [...templist, element];
      }
    });
    setContentList(templist);
    settotalcount(totalcount - 1);
  };
  const ContentChange = (data) => {
    setContent(data.target.value);
  };

  const MainList = ContentList.map((data) => (
    <div style={{ marginRight: 40, marginBottom: 10 }}>
      <Card>
        <Card.Header>
          <Row>
            {seticon(data.category)} {data.category}
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text>{data.content}</Card.Text>
            </Col>
            <Col xs="auto">
              <Button
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onClick={() => RemoveContent(data.key)}
                variant="danger"
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  ));

  const AddList = (item) => {
    addbuttontimer();
    item.preventDefault();
    setContentList([
      {
        key: Math.round(dateobject.getTime() / 1000),
        category: category,
        content: content
      },
      ...ContentList
    ]);
    setContent("");
    settotalcount(totalcount + 1);
  };
  const SaveContent = () => {
    const contenttosave = "data:text/plain," + JSON.stringify(ContentList);
    console.log(contenttosave);
    saveAs(contenttosave, "Output.json");
  };
  return (
    <div className="App">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generated JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>{JSON.stringify(ContentList)}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={CopytoClipboard}>
            Copy to clipboard
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid>
        <h1>Safely Database Entry Tool</h1>
        <Form>
          <Form.Group>
            <Form.Label>Enter Content Here</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={"(Please don't press enter between lines.)"}
              type="text"
              value={content}
              onChange={ContentChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={ChangeCategory}
            >
              <option selected value="General">
                General
              </option>
              <option value="Nutrition">Nutrition</option>
              <option value="Stay Young">Stay Young</option>
              <option value="Stress Management">Stress Management</option>
              <option value="Healthy Habits">Healthy Habits</option>
              <option value="Common Mistakes">Common Mistakes</option>
              <option value="Immunity">Immunity</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Button
              disabled={!addbuttonstatus}
              variant="primary"
              value="Submit"
              onClick={AddList}
            >
              Add
            </Button>
          </Form.Group>
        </Form>
        <Alert hidden={addbuttonstatus} variant="primary">
          Generating new key
        </Alert>
        <Card>
          <div
            style={{
              marginBottom: 10,
              marginTop: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Badge variant="secondary">Item Count: {totalcount}</Badge>
          </div>

          <ul>{MainList}</ul>
        </Card>
        <div style={{ marginTop: 18 }}>
          <ButtonGroup aria-label="Basic example">
            <Button onClick={SaveContent} variant="success">
              Save
            </Button>
            <Button onClick={handleShow} variant="warning">
              {" "}
              Generate
            </Button>
          </ButtonGroup>
        </div>
      </Container>
    </div>
  );
}
