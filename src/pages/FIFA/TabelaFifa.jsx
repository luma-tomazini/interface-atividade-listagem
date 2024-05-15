import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Table from 'react-bootstrap/Table';
import FifaRequests from '../../Fetchs/FIFARequests';

function TabelaFifa() {
    const [jogadores, setJogadores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Número de itens por página
    const [pageNumberInput, setPageNumberInput] = useState(""); // Estado para armazenar o número da página inserido pelo usuário

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaJogadores = await FifaRequests.listarJogadores();
                setJogadores(listaJogadores);
            } catch (error) {
                console.error('Erro ao buscar jogadores: ', error);
            }
        };

        fetchData();
    }, []);

    // Atualiza o valor do campo de entrada ao mudar de página
    useEffect(() => {
        setPageNumberInput(currentPage.toString());
    }, [currentPage]);

    // Função para calcular o índice inicial e final dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJogadores = jogadores.slice(indexOfFirstItem, indexOfLastItem);

    // Função para navegar para a página inserida pelo usuário ao digitar o número
    const handlePageInputChange = (e) => {
        const pageNumber = parseInt(e.target.value);
        if (pageNumber > 0 && pageNumber <= Math.ceil(jogadores.length / itemsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <NavBar />
            <h1>Tabela FIFA</h1>
            {jogadores.length > 0 ? (
                <>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome do Jogador</th>
                                <th>Pé Dominante</th>
                                <th>Posição</th>
                                <th>OVR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentJogadores.map((jogador) => (
                                <tr key={jogador.playerid} jogador={jogador}>
                                    <td>{jogador.playerid}</td>
                                    <td>{jogador.playername}</td>
                                    <td>{jogador.foot}</td>
                                    <td>{jogador.playerposition}</td>
                                    <td>{jogador.ovr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Componente de paginação */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <input
                                type="number"
                                min="1"
                                max={Math.ceil(jogadores.length / itemsPerPage)}
                                value={pageNumberInput}
                                onChange={(e) => {
                                    setPageNumberInput(e.target.value);
                                    handlePageInputChange(e); // Navega automaticamente para a página ao digitar o número
                                }}
                            />
                            <span> de {Math.ceil(jogadores.length / itemsPerPage)}</span>
                        </div>
                        <div>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === Math.ceil(jogadores.length / itemsPerPage)}
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Carregando ...</p>
            )}
        </>
    );
}

export default TabelaFifa;