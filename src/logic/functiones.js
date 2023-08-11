import { TablaWinner } from "./constantes";
export const checkWinner = (tablero) => {
    for (let i = 0; i < TablaWinner.length; i++) {
        const [a, b, c] = TablaWinner[i];
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {

            return tablero[a];
        }
    }
    return null;
};

export const checkEnGame = (tablero) => {
    return tablero.every((a) => a !== null);
}