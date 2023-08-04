import {Component} from 'react'

import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'

import {
  GameContainer,
  TitleContainer,
  Heading,
  ScoreCard,
  ScoreHeading,
  Score,
  GameChoices,
  RulesContainer,
  RulesButton,
  GameImage,
  GameButton,
  PopupView,
  PopupImage,
  PopupButton,
  ResultContainer,
  SelectedItem,
  PlayAgainButton,
  Result,
  ResultContainer2,
  SelectedOne,
} from './styledComponents'

class RockPaperScissors extends Component {
  state = {
    score: 0,
    isPlayed: false,
    userSelected: '',
    opponentSelected: '',
    gameResult: '',
  }

  findResult = (userSelection, opponentSelection) => {
    if (userSelection === 'ROCK') {
      switch (opponentSelection) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (userSelection === 'PAPER') {
      switch (opponentSelection) {
        case 'ROCK':
          return 'YOU WON'
        case 'SCISSORS':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (opponentSelection) {
        case 'PAPER':
          return 'YOU WON'
        case 'ROCK':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  onClickItem = event => {
    console.log(event.target.alt)
    const {score} = this.state
    const {choicesList} = this.props
    const userSelection = event.target.alt
    const opponentSelection =
      choicesList[Math.floor(Math.random() * choicesList.length)].id
    const result = this.findResult(userSelection, opponentSelection)
    let newScore = score
    if (result === 'YOU WIN') {
      newScore = score + 1
    } else if (result === 'YOU LOSE') {
      newScore = score - 1
      if (newScore < 0) {
        newScore = 0
      }
    } else {
      newScore = score
    }

    this.setState({
      score: newScore,
      isPlayed: true,
      userSelected: userSelection,
      opponentSelected: opponentSelection,
      gameResult: result,
    })
  }

  renderResult = () => {
    const {userSelected, opponentSelected, gameResult} = this.state
    const {choicesList} = this.props
    const userSelectedChoice = choicesList.filter(
      eachItem => eachItem.id === userSelected,
    )
    const opponentSelectedChoice = choicesList.filter(
      eachItem => eachItem.id === opponentSelected,
    )

    return (
      <>
        <ResultContainer>
          <SelectedItem>
            <SelectedOne>YOU</SelectedOne>
            <GameImage src={userSelectedChoice[0].imageUrl} alt="your choice" />
          </SelectedItem>
          <SelectedItem>
            <SelectedOne>OPPONENT</SelectedOne>
            <GameImage
              src={opponentSelectedChoice[0].imageUrl}
              alt="opponent choice"
            />
          </SelectedItem>
        </ResultContainer>
        <ResultContainer2>
          <Result>{gameResult}</Result>
          <PlayAgainButton type="button" onClick={this.onClickPlayAgain}>
            PLAY AGAIN
          </PlayAgainButton>
        </ResultContainer2>
      </>
    )
  }

  onClickPlayAgain = () => {
    this.setState({isPlayed: false})
  }

  render() {
    const {choicesList} = this.props
    const {isPlayed, score} = this.state
    return (
      <GameContainer>
        <TitleContainer>
          <Heading>
            ROCK <br /> PAPER
            <br /> SCISSORS
          </Heading>
          <ScoreCard>
            <ScoreHeading>Score</ScoreHeading>
            <Score>{score}</Score>
          </ScoreCard>
        </TitleContainer>
        {!isPlayed && (
          <GameChoices>
            <GameButton
              type="button"
              data-testid="rockButton"
              onClick={this.onClickItem}
            >
              <GameImage
                src={choicesList[0].imageUrl}
                alt={choicesList[0].id}
              />
            </GameButton>
            <GameButton type="button" data-testid="scissorsButton">
              <GameImage
                src={choicesList[1].imageUrl}
                alt={choicesList[1].id}
                onClick={this.onClickItem}
              />
            </GameButton>
            <GameButton type="button" data-testid="paperButton">
              <GameImage
                src={choicesList[2].imageUrl}
                alt={choicesList[2].id}
                onClick={this.onClickItem}
              />
            </GameButton>
          </GameChoices>
        )}
        {isPlayed && this.renderResult()}
        <RulesContainer>
          <Popup modal trigger={<RulesButton type="button">Rules</RulesButton>}>
            {close => (
              <PopupView>
                <PopupButton type="button" onClick={() => close()}>
                  <RiCloseLine />
                </PopupButton>
                <PopupImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </PopupView>
            )}
          </Popup>
        </RulesContainer>
      </GameContainer>
    )
  }
}

export default RockPaperScissors
