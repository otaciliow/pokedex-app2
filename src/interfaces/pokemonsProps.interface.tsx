export interface IPokemonsProps {
    id: number;
    nome: string;
    tipo1: string;
    tipo2: string | null;
    descricao?: string;
}