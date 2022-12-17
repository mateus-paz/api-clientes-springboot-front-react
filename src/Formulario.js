function Formulario({botao, eventoTeclado, eventoContato, cadastrar, obj, cancelar, remover, alterar, 
consultar}){
    var contato = obj.contato;

   
    

    return (
    <form>
        <div className="row">
            <div className="col-9">
                <input type='number' value={obj.id} onChange={eventoTeclado} name="id" placeholder="Digite um Id para consulta. ex:2" className="form-control"/>
            </div>
            <div className="col-3">
                <input type='button' value="Consultar" onClick={consultar} className="btn btn-primary"/>
            </div>
        </div>
        <hr></hr>
        
        <input type='text' value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome Cliente" className="form-control"/>
        <input type='text' value={contato.tipo} onChange={eventoContato} name="tipoContato" placeholder="Tipo Contato" className="form-control"/>
        <input type='text' value={contato.texto} onChange={eventoContato} name="textoContato" placeholder="Texto Contato" className="form-control"/>
    
        {
            botao
            ?    
            <input type='button' value="Cadastrar" onClick={cadastrar} className="btn btn-primary"/>
            :
            <div>
                <input type='button' value="Alterar" onClick={alterar}  className="btn btn-warning"/>
                <input type='button' value="Remover" onClick={remover}  className="btn btn-danger"/>
                <input type='button' value="Cancelar" onClick={cancelar} className="btn btn-secondary"/>      
            </div> 
        }

    </form>

    )

}

export default Formulario;