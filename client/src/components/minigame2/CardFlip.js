import React, { PureComponent } from "react";
import Header from "./components/header/Header";
import Card from "./components/card/card";
import GameOver from "./components/card/GameOver";
import "./css/stylesheet.css";

class MiniGame2 extends PureComponent {
  state = {
    isFlipped: Array(16).fill(false),
    shuffledCard: MiniGame2.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardID: -1
  };

  static duplicateCard = () => {
    return [0,1,2,3,4,5,6,7].reduce(
      (preValue, current, index, array) => {
        return preValue.concat([current, current]);
        // console.log(current)
      },
      []
    );
  };

  // componentDidMount(){
  //   setInterval( () =>
  //   {
  //     let num = this.state.time;
  //     let diff = num - 1;
  //     console.log(diff)
  //     this.setState ({time: diff})
  //     }, 1000)
  // };
  
  
  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
      prevSelectedCard: this.state.shuffledCard[cardId],
      prevCardId: cardId
    });

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        // console.log(this.state.clickCount)
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }));
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: MiniGame2.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1
    });
  };
  
  isGameOver = () => {
    return this.state.isFlipped.every(
      (element, index, array) => element !== false,
    );
  };

  render() {
    return (
      <div>
        <h2>PEDAL PICKER</h2>
        <p className="instruct-2">Increase your magic on your voyage through Kingsthon Hallow! To do so, you must match 
          each flower with its twin. If you can’t match the twins, then you will not receive the magic. </p>
        <Header restartGame={this.restartGame} />
        {this.isGameOver() ? (
        <GameOver 
        levelUp= {this.props.levelUp}
          restartGame={this.restartGame}
          userName={this.props.userName} />
        ) : (
          <div className="grid-container">
            {this.state.shuffledCard.map((cardNumber, index) => (
              <Card
                key={index}
                id={index}
                cardNumber={cardNumber}
                isFlipped={this.state.isFlipped[index]}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MiniGame2;