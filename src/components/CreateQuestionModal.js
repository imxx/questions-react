import React, {Component} from 'react';
import _ from "lodash";
import { Modal, Button }  from "react-bootstrap";

import CreateQuestionForm from "./CreateQuestionForm";


class CreateQuestionModal extends Component {

  state = {
    answers: 2
  }

  addAnswerInput(){
    this.setState({ answers: this.state.answers + 1 })
  }
  removeAnswerInput(){
    if(this.state.answers < 3) return;
    this.setState({ answers: this.state.answers - 1 })
  }

  render() {
    return (
        <Modal show={this.props.open} onHide={this.props.toggleModal}>

              <Modal.Header closeButton>
                <Modal.Title><h3>Add New Question</h3></Modal.Title>
              </Modal.Header>

              <Modal.Body>

                  <div className="form-configuration-panel">
                    <button onClick={this.addAnswerInput.bind(this)} className="btn btn-info">
                      <i className="fa fa-plus"></i> Add New Answer
                    </button>
                    <button onClick={this.removeAnswerInput.bind(this)} className={`btn btn-warning ${(this.state.answers < 3) ? 'hidden' : ''}`} >
                      <i className="fa fa-minus"></i> Remove Answer
                    </button>
                  </div>

                <CreateQuestionForm toggleModal={this.props.toggleModal}
                    fields={_.times(this.state.answers, (n) => "answer_" + (n + 1) ).concat(["question"])} />
                  

              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this.props.toggleModal}>Close</Button>
              </Modal.Footer>

        </Modal>
    );
  }
}

export default CreateQuestionModal;