export function Tablero({children,rellenar,index,isTurno}) {
    const className=`casilla ${isTurno?'selection':''}`
    const handleClick = () => {
        rellenar(index);
    }
    return (
        <div className={className}  onClick={handleClick}>{children}</div>
    )
}