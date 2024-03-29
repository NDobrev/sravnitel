import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Paper, Icon } from '@material-ui/core';

import UploadIcon from './assets/upload.png'; 

const styles = {
  main: {
    position: "absolute",
    top: "20%",
    left: "20%",
    display: "flex",
    flexDirection: "column",
    color: "text.primary"
  },
  button: {
    width: "250px",
    overflow: "hidden"
  },
  fileUpload: {
    marginLeft: "10px",
    width: "20px",
    height: "20px",
  }
};


class StartPanel extends React.Component {
  constructor(props) {
    super();
    this.styles = props.classes;
    this.onready = props.onready;
    this.state = {
      firstName : "Upload first File",
      secondName : "Upload second File",
      targetName : "Upload target File",
      firstFile : null,
      secondFile : null,
      targetFile : null,
      ready: false,
    }
  }

  onLoadFirstFile(files) {
    this.setState ({
      firstName: files[0].name,
      firstFile: files[0]
    }, ()=> {this.checkIfReady()});
  }

  onLoadSecondFile(files) {
    this.setState ({
      secondName: files[0].name,
      secondFile: files[0]
    }, ()=> {this.checkIfReady()});
  }

  onLoadTargetFile(files) {
    this.setState ({
      targetName: files[0].name,
      targetFile: files[0]
    }, ()=> {this.checkIfReady()});
  }

  checkIfReady() {
    let {firstFile, secondFile, targetFile}  = this.state;
    let allFilesAreReady = firstFile && secondFile && targetFile;
    let allSizeAreEq =  allFilesAreReady && firstFile.size == secondFile.size && firstFile.size == targetFile.size;
      this.setState({
          ready: allFilesAreReady && allSizeAreEq
      });
  }

  onStart() {
    this.onready({
      first: this.state.firstFile,
      second: this.state.secondFile,
      target: this.state.targetFile,
    })
  }

  render() {
    return (
      <Paper elevation={3} className={this.styles.main}>
        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
          <Button component="label"  >
            <div className={this.styles.button}>
            {this.state.firstName}
            </div>
            <input
                type="file"
                style={{ display: "none" }}
                onChange={ (e) => this.onLoadFirstFile(e.target.files) }
            />
          <img  className={this.styles.fileUpload} src={require('./assets/upload.png')}></img >
          </Button>

          <Button component="label">
            <div className={this.styles.button}>
            {this.state.secondName}
            </div>
            <input
                type="file"
                style={{ display: "none" }}
                onChange={ (e) => this.onLoadSecondFile(e.target.files) }
            />
            <img  className={this.styles.fileUpload} src={require('./assets/upload.png')}></img >
          </Button>
          <Button component="label">
              <div className={this.styles.button}>
             {this.state.targetName}
             </div>
            <input
                type="file"
                style={{ display: "none" }}
                onChange={ (e) => this.onLoadTargetFile(e.target.files) }
            />
            <img  className={this.styles.fileUpload} src={require('./assets/upload.png')}></img >
          </Button>
                  
        </ButtonGroup>
        <Button disabled={!this.state.ready} onClick={this.onStart.bind(this)}> Start</Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(StartPanel);

