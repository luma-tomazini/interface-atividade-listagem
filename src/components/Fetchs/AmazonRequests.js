class AmazonRequests {

    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarLivro = '/vendas';
    }

    async listarLivros() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarLivro}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }
}

export default new AmazonRequests;