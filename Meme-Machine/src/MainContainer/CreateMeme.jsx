import React, { Component } from "react";
import "./createMeme.scss";

class CreateMeme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLine: "",
      secondLine: "",
      allMemeImgs: [],
      selectedImage: {},
    };
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        let { memes } = response.data;
        const memes1 = memes.filter((i) => i.box_count === 2);
        let rando = Math.floor(Math.random() * (memes.length - 1));
        this.setState({
          allMemeImgs: memes1,
          selectedImage: memes1[rando - 1],
        });
      })
      .catch((e) => {
        console.log("error has ooccured");
      });
  }

  handelChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  changeImage = () => {
    let rando = Math.floor(Math.random() * (this.state.allMemeImgs.length - 1));
    this.setState({
      firstLine: "",
      secondLine: "",
      selectedImage: this.state.allMemeImgs[rando - 1]
        ? this.state.allMemeImgs[rando - 1]
        : this.state.selectedImage,
    });
  };

  printMeme = () => {
    window.print();
  };
  clearText = () => {
    this.setState({
      firstLine: "",
      secondLine: "",
    });
  };

  share = async() => {
     let u = this.state.selectedImage.url;
    let t = this.state.selectedImage.name;
    window.open(
      "http://www.facebook.com/sharer.php?u=" +
        encodeURIComponent(u) +
        "&t=" +
        encodeURIComponent(t),
      "sharer",
      "toolbar=0,status=0,width=626,height=436"
    ); 
    return false;
  };

  render() {
    return (
      <>
        <div className="meme-container">
          <div className="display">
            <div className="input-row">
              <span>
                <label> Top Line: </label>
                <input
                  value={this.state.firstLine}
                  name="firstLine"
                  onChange={this.handelChange}
                ></input>
              </span>
              <span>
                <label> Bottom Line: </label>
                <input
                  value={this.state.secondLine}
                  name="secondLine"
                  onChange={this.handelChange}
                ></input>
              </span>
            </div>
            <div className="button-row">
              <button onClick={this.changeImage}>
                {" "}
                {this.state.selectedImage?.url ? "Change" : "Create"} Template
              </button>
              <button onClick={this.clearText}> Clear Text </button>
              <button onClick={this.printMeme}> Print </button>
              <button onClick={this.share}> Share on Facebook </button>
            </div>
          </div>
        </div>
        <div className="meme-space">
          {this.state.selectedImage?.url && (
            <div className="meme" id="print_meme">
              <h2 className="top"> {this.state.firstLine} </h2>
              <img
                src={this.state.selectedImage.url}
                alt={this.state.selectedImage.name}
                id={this.state.selectedImage.id}
              />
              <h2 className="bottom"> {this.state.secondLine} </h2>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default CreateMeme;
