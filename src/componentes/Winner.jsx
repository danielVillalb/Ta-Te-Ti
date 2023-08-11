
export function Winner({winner,reiniciar}) {
    if(winner === null)return null;
    const winnerText = winner === false ? 'Empate' : 'Felicidades el ganador es: '

    console.log(winnerText,winner)
    return (
        <section className='winner'>
        <h2>{winnerText}{winner}</h2>
        <div className='contenedor-reiniciar'>
          <h3>Volver a jugar</h3>
          <button className='btn-reiniciar' onClick={reiniciar}><img src="../src/assets/img/recargar.png" alt="" /></button>
        </div>
      </section>
    )
}