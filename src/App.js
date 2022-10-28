
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "./img/cat1.jpg", matched: false },
  { "src": "./img/cat2.jpg", matched: false },
  { "src": "./img/cat3.jpg", matched: false },
  { "src": "./img/cat4.jpg", matched: false },
  { "src": "./img/cat5.jpg", matched: false },
  { "src": "./img/cat6.jpg", matched: false },
  { "src": "./img/cat7.jpg", matched: false },
  { "src": "./img/cat8.jpg", matched: false },
  { "src": "./img/cat9.jpg", matched: false },
  { "src": "./img/cat10.jpg", matched: false },
  { "src": "./img/cat11.jpg", matched: false },
  { "src": "./img/cat12.jpg", matched: false },
]


function App() {


  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)

  }




  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  //compare two selected cards

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })


        })
        resetTurn()

      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }

  }, [choiceOne, choiceTwo])


  console.log(cards);



  //reset choices & increase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    // setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  return (
    <div className="App">
      <h1>Matching Cats</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}


          />

        ))}
      </div>
    </div>


  );
}

export default App;
