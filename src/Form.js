function Form(){
    return (
    <form>
        <input type='text' placeholder="Valor" className="form-control"/>
        <input type='text' placeholder="Data" className="form-control"/>
        <input type='text' placeholder="Categoria" className="form-control"/>
        <input type='text' placeholder="DescricaoCategoria" className="form-control"/>

        <select name="tipoPagamento">
            <option>Dinheiro</option>
            <option>Débito</option>
            <option>Crédito</option>
            <option>Pix</option>
        </select>

        <input type='button' value="Cadastrar" lassName="btn btn-primary"/>

    </form>

    )

}

export default Form;