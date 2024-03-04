import React from 'react';

const Board = ({board, onOpen}) => {
    return (
        <div className='gameBoard'>
            {board.map((card, id) => card.open === true ? <button key={card.id}
                                                                  className='button'

                >{card.img}

                </button> :
                <button className='button'
                        onClick={() => onOpen(card.id)}
                        key={card.id}
                >{null}

                </button>)

            }
        </div>
    );
};

export default Board;