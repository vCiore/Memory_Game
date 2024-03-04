
import './App.css';
import {useEffect, useState} from "react";
import Board from "./component/Board";

function App() {

   const [board, setBoard] = useState(new Array(12).fill({}).map(el => ({id: Math.random(), img:''})))

    const imgArray = ['🐬', '🐍', '🏄', '⛵️', '🌺', '🌴']

    const [count, setCount] = useState(0)

    const [prevCard, setPevCard] = useState({})

    const [nextCard, setNextCard] = useState({})

    const [click, setClick] = useState(0)

    const shuffleCards = () => {

       const doubleImgArray = [...imgArray, ...imgArray]

        const sortedImgArray=doubleImgArray.sort(()=> Math.random() - 0.5)
        const newBoard = board.map((el,index) => ({...el, img: sortedImgArray[index], open: false}))

        setBoard(newBoard)
        console.log(newBoard)
    }

    useEffect( () =>{
        shuffleCards()
        }
    , [])

    const handleOpenCard = (cardId) => {

       console.log(click)
        setCount(count + 1)
        setClick(click + 1)

        if (click === 0) {

            setPevCard(board.find(card=> card.id===cardId))
            setBoard(board.map(card => card.id===cardId? {...card, open:true} : card))

        } else if (click === 1){
            setNextCard({...board.find(card=> card.id===cardId)})
            setBoard(board.map(card => card.id===cardId? {...card, open:true} : card))
        }

       if (click ===2) {
           if (prevCard.img !== nextCard.img ) {

               const newBoard = board.map(card =>
                   (card.id === cardId || card.id===prevCard.id || card.id=== nextCard.id) ? {...card, open: !card.open} : card)

               setBoard(newBoard)
               setPevCard({...board.find(card=> card.id===cardId)})
               setNextCard({})
               setClick(1)

           } else {

               setBoard(board.map(card => card.id===cardId? {...card, open:true} : card))
               setPevCard({...board.find(card=> card.id===cardId)})
               setNextCard({})
               setClick(1)

           }
       }

    }

    const handelPlayAgain=() => {

        setBoard(shuffleCards)
        setCount(0)
        setClick(0)
        setPevCard({})
        setNextCard({})

    }

    return (
    <div className="App"

    >
        <h1>Memory Game</h1>

       <Board board={board}
              onOpen={handleOpenCard}
       />

       <h1>Steps: {count} </h1>

       <button  onClick={handelPlayAgain} className='play'>Play again</button>

    </div>
  );
}

export default App;
