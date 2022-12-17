
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  //Objeto Cliente
  const cliente = {
    id: '',
    nome: '',
    dataCadastro: 'asfd',
    contato:{
      id:'',
      tipo:'',
      texto:''
    } 
  }

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [clientes, setCliente] = useState([]);
  const [objCliente, setObjCliente] = useState(cliente);

  //UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/api/Clientes")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setCliente(retorno_convertido));
  }, []);
   

//Obtendo dados do formulario
const aoDigitar = (e) => {
  
  setObjCliente({...objCliente, [e.target.name] : e.target.value});

}

const onChangeContato = (e) =>{

  setObjCliente({...objCliente, contato:{
    texto : e.target.name ==='textoContato' ? e.target.value : objCliente.contato.texto,
    tipo: e.target.name ==='tipoContato' ? e.target.value : objCliente.contato.tipo
  }
});
}

//Cadastrar cliente
const cadastrar = () => {
  const objCadastro = {
    nome: objCliente.nome, 
    datacadastro: " ",
    contato: objCliente.contato
  }
  
  fetch('http://localhost:8080/api/Clientes', {
    method:'POST',
    body: JSON.stringify(objCadastro),
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  })
  .then((retorno) => retorno.json())
  .then((retorno_convertido) => {
    if(retorno_convertido.errors !== undefined){
      alert(JSON.stringify(retorno_convertido));
    }else{  
    setCliente([...clientes, retorno_convertido]);
    
      alert('Cliente Cadastrado com sucesso');
      limparFormulario();
    }
  })
}

//ConsultarPorId
const consultar = () => {
  
  fetch('http://localhost:8080/api/Clientes/'+objCliente.id)
  .then(retorno =>retorno.json())
  .then(retorno_convertido =>{
    if(retorno_convertido.status === 404){
      alert("Cliente não encontrado");
    }else{
    setObjCliente(retorno_convertido);
    setBtnCadastrar(false);
    }
  })
  
}

//Pesquisar Por Nome
const pesquisar = () => {
  fetch('http://localhost:8080/api/Clientes/query/'+objCliente.nome)
  .then(retorno =>retorno.json())
  .then(retorno_convertido =>{
    
    alert("Resultados encontrados: "+JSON.stringify(retorno_convertido));
    
  })

};



//Alterar cliente
const alterar = () => {
  fetch('http://localhost:8080/api/Clientes/'+objCliente.id, {
    method:'put',
    body: JSON.stringify(objCliente),
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
  .then(retorno =>retorno.json())
  .then(retorno_convertido =>{

    if(retorno_convertido.errors !== undefined){
      alert(JSON.stringify(retorno_convertido));
    }else{

      alert('Cliente Alterado com sucesso');

       //Copia do vetor de clientes
    let vetorTemp = [...clientes];

    //indice
    let indice = vetorTemp.findIndex((c) =>{
      return c.id === objCliente.id;
    });

    //Alterar produto do vetor temp

    vetorTemp[indice] = objCliente;
    //Atualizar o veeto de  clientes

    setCliente(vetorTemp);

      limparFormulario();
    }

    
  })
}

//Remover cliente
const remover = () => {
  fetch('http://localhost:8080/api/Clientes/'+objCliente.id, {
    method:'delete',
    headers:{
      'Content-typo':'aplication/json',
      'Accept':'application/json'
    }
  })
  .then(retorno =>retorno.json())
  .then(retorno_convertido =>{
    //Mensagem
    alert(retorno_convertido.mensagem);

    //Copia do vetor de clientes
    let vetorTemp = [...clientes];

    //indice
    let indice = vetorTemp.findIndex((c) =>{
      return c.id === objCliente.id;
    });

    //Remover produto do vetor temp

    vetorTemp.splice(indice, 1);

    //Atualizar o veeto de  clientes

    setCliente(vetorTemp);

    //Limpar Formulario
    limparFormulario();

  })
}

//Limpar Formulario
const limparFormulario = () => {
  setObjCliente(cliente);
  setBtnCadastrar(true);
}

//selecionar produo
const selecionarCliente = (indice) => {
  setObjCliente(clientes[indice]);
  setBtnCadastrar(false);
}

  return (
    
    <div className="row">
      <header className="text-bg-dark">
        <div className='container py-3'>
          <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
            ClientesAPI DotNet
          </div>
        </div>
      </header>
  
      <div className="col-6">
       <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} eventoContato={onChangeContato}
       cadastrar={cadastrar} obj={objCliente} cancelar={limparFormulario} remover={remover} alterar={alterar}
       consultar={consultar}/>
      </div>
      <div className="col-6">
       <Tabela vetor={clientes} selecionar={selecionarCliente} pesquisa={pesquisar} eventoTeclado={aoDigitar}/>
      </div>
    </div>
  );
}

export default App;
