import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti';
import { TURNS, Gano } from './logic/constantes';
import { checkWinner, checkEnGame } from './logic/functiones';
import { Tablero } from './componentes/Tablero';
import { Winner } from './componentes/Winner';

function App() {
  const [tablero, setTablero] = useState(() => {
    const tableroFromStorage = window.localStorage.getItem('tablero');
    if (tableroFromStorage) return JSON.parse(tableroFromStorage)
    return Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.x
  })


  




  const [winner, setWinner] = useState(()=>{
    const winnerFromStorage=window.localStorage.getItem('winner');
    if(checkWinner(tablero)){
      console.log(checkWinner(tablero))
      return winnerFromStorage??Gano.c
    }else{
      return JSON.parse.winnerFromStorage=checkEnGame(tablero)?Gano.b:null
    }
  }
    );//no hay ganador


  const rellenar = (index) => {
    if (tablero[index] || winner) return
    const newTablero = [...tablero];
    newTablero[index] = turn;
    setTablero(newTablero);
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    const newWinner = checkWinner(newTablero);
    window.localStorage.setItem('tablero', JSON.stringify(newTablero));
    window.localStorage.setItem('turn', newTurn);
    window.localStorage.setItem('winner', newWinner);
    console.log(window.localStorage.getItem('tablero'));
    console.log(window.localStorage.getItem('turn'));
    console.log(window.localStorage.getItem('winner'));
    if (newWinner) {
      confetti();
      setWinner((prevWinner) => {
        console.log(`Ganador:${newWinner}, el anterior era ${prevWinner}`);
        return newWinner
      })
    } else if (checkEnGame(newTablero)) {
      setWinner(false);
      window.localStorage.setItem('winner', newWinner);
      console.log('no hay ganador')
    }//asincronos no blockea la ejecucion despues
  }
  const reiniciar = () => {
    setWinner(null);
    setTablero(Array(9).fill(null));
    setTurn(TURNS.x);
    window.localStorage.removeItem('tablero');
    window.localStorage.removeItem('turn');
    window.localStorage.removeItem('winner');
  }


  return (
    <main>
      <section className='inicio'>
        <h1>Ta Te Ti</h1>
        <p>Bienvenido a mi primer programa con react, espero lo disfrute.</p>
        <div className={((checkEnGame(tablero) === false) && winner === null) ? 'func' : 'no-func'}>
          <button className='btn' onClick={reiniciar}>Reiniciar</button>


        </div>
      </section>
      <section className='tablero-lista'>
        <article className='tablero'>

        {
          tablero.map((casilla, index) => {
            return <Tablero key={index} index={index} rellenar={rellenar}>{casilla}</Tablero>
          })
        }
        </article>

      </section>
      <Winner winner={winner} checkWinner={checkWinner} reiniciar={reiniciar}></Winner>
      <section className='tablero-lista'>
        <Tablero isTurno={turn===TURNS.x}>{TURNS.x}</Tablero>
        <Tablero isTurno={turn===TURNS.o}>{TURNS.o}</Tablero>
      </section>
    </main>
  )
}

export default App
