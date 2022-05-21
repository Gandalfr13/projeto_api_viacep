const cep = document.getElementById("cep")
const search = document.getElementById("search")
const clear = document.getElementById("clear")

//validar o CEP
const validaCep = (cep) => {
    //retorna verdadeiro ou falso - true or false
    //expressão regular verifica se os caracteres são numéricos e tem 8 decomprimento
    return cep.length == 8 && /^[0-9]+$/.test(cep)
    //Não esquecer do Return em caso de arrow function com mais de uma linha!!!
}

const preencherDados = async(endereco) =>{

    const div_response= document.createElement("div")
    div_response.setAttribute("class","countainer")
    div_response.setAttribute("id", "div_response")

    const logradouro = document.createElement("p")
    logradouro.setAttribute("class","resposta")
    logradouro.setAttribute("id","logradouro")
    logradouro.innerHTML = endereco.logradouro

    const bairro = document.createElement("p")
    bairro.setAttribute("class","resposta")
    bairro.setAttribute("id","bairro")
    bairro.innerHTML = endereco.bairro

    const localidade = document.createElement("p")
    localidade.setAttribute("class","resposta")
    localidade.setAttribute("id","localidade")
    localidade.innerHTML = endereco.localidade

    div_response.appendChild(logradouro)
    div_response.appendChild(bairro)
    div_response.appendChild(localidade)

    document.body.appendChild(div_response)

}
                                   
const searchCep = async () =>{

    const cep_valor = cep.value

    try{

        if(validaCep(cep_valor)){

            const viaCep_url = `https://viacep.com.br/ws/${cep_valor}/json/`

            const cep_dados = await fetch(viaCep_url)

            const cep_json = await cep_dados.json()

            console.log(cep_json)

            if(cep_json.hasOwnProperty('erro')){

                throw{
                    "name":"ErroCep",
                    "message":"Não foi posivel consultar o CEP"
                }

            }else{
               await preencherDados(cep_json)   
            }
        }else{
            throw{
                "name":"ErroCep",
                "message":"CEP Inválido"
            }
        }
    }catch(error){

        const erro_cep = document.createElement("p")
        erro_cep.setAttribute("id", "erro_cep")
        erro_cep.setAttribute("class", "erro_cep")
        erro_cep.innerHTML = error.message

        document.body.appendChild(erro_cep)

    }
}

const clearCep = () =>{

    const div_response = document.getElementById("div_response")

    const error = document.getElementById("erro_cep")

    document.getElementById("cep").value = ""

    if(div_response){
        document.body.removeChild(div_response)
    }else{
        document.body.removeChild(error)
    }
}

search.addEventListener('click', searchCep)
clear.addEventListener('click', clearCep)
cep.addEventListener('focus', clearCep)