function Tabela({vetor, selecionar, pesquisa, eventoTeclado}){

    return (
        <div className="container">
            <form>
                <div className="row">
                    <div className="col-9">
                        <input type='text' onChange={eventoTeclado} name="nome" placeholder="Digite um nome para pesquisa. ex:mateus" className="form-control"/>
                    </div>
                    <div className="col-3">
                        <input type='button' onClick={pesquisa} value="Pesquisar" className="btn btn-primary"/>
                    </div>
                </div>
            </form>
            <hr></hr>
            <table className="table">

                <thead >
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Data Cadastro</th>
                        <th>Tipo Contato</th>
                        <th>Texto Contato</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.dataCadastro}</td>
                            <td>{obj.contato.tipo}</td>
                            <td>{obj.contato.texto}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn"> Selecionar</button></td>
                        </tr>    
                    ))

                }
                </tbody>

            </table>
        </div>
    )

}

export default Tabela;