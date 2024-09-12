let listaRecintos = [
    { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "macaco", quantidade: 3 }] },
    { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "gazela", quantidade: 1 }] },
    { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "leao", quantidade: 1 }] },
]

let listaAnimais = {
    "leao": { tamanho: 3, habitat: ["savana"], carnivoro: true },
    "leopardo": { tamanho: 2, habitat: ["savana"], carnivoro: true },
    "crocodilo": { tamanho: 3, habitat: ["rio"], carnivoro: true },
    "macaco": { tamanho: 1, habitat: ["savana", "floresta"], carnivoro: false },
    "gazela": { tamanho: 2, habitat: ["savana"], carnivoro: false },
    "hipopotamo": { tamanho: 4, habitat: ["savana", "rio"], carnivoro: false },
}

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        let resposta
        let recintoCompativel = []

        if(!listaAnimais[animal]){ // checando se o animal é invalido
            resposta =  "Animal inválido"
        }else if(quantidade <= 0){ // checando se quantidade é invalida
            resposta = "Quantidade inválida"
        }else{ // analisando os recintos
            let animalInfo = listaAnimais[animal]
            listaRecintos.forEach(recinto => {
                let ocupado = recinto.animaisExistentes.reduce((total, animal) => total + (animal.quantidade * listaAnimais[animal.especie].tamanho), 0)
                let livre = recinto.tamanhoTotal - ocupado
                let parceiro = recinto.animaisExistentes.map(parceiro => {
                    return parceiro.especie
                })

                //checando o bioma de cada recinto
                if(animalInfo.habitat.includes(recinto.bioma) && (recinto.bioma.includes(animalInfo.habitat[0]) || recinto.bioma.includes(animalInfo.habitat[1]))){
                    
                    // carnivoro apenas com a mesma especie
                    if(animalInfo.carnivoro && (parceiro.includes(animal) || recinto.animaisExistentes.length == 0) ){
                        if (livre >= animalInfo.tamanho * quantidade) {
                            recintoCompativel.push({ numero: recinto.numero, livre, valorTotal: recinto.tamanhoTotal })
                            return
                        }
                    }

                    // vendo se já esta ocupado
                    switch(recinto.animaisExistentes.length){
                        case 0: //vazio
                           if (livre >= animalInfo.tamanho * quantidade) {
                                recintoCompativel.push({ numero: recinto.numero, livre, valorTotal: recinto.tamanhoTotal })
                                break
                            }
                            break
                        default:
                            // caso seja um hipopotamo, não adicionar ao recinto
                            if(!animal == "hipopotamo"){
                                //predador
                                if(parceiro.includes("leao") || parceiro.includes("leopardo") || parceiro.includes("crocodilo")){
                                break
                                }
                                
                                // ocupado pela mesma especie
                                if(parceiro.includes(animal)){
                                    if (livre >= animalInfo.tamanho * quantidade) {
                                        recintoCompativel.push({ numero: recinto.numero, livre, valorTotal: recinto.tamanhoTotal })
                                        break
                                    }
                                }

                                // especie diferente
                                if (livre >= (animalInfo.tamanho * quantidade) + 1) {
                                    recintoCompativel.push({ numero: recinto.numero, livre, valorTotal: recinto.tamanhoTotal })
                                    return
                                }
                                break
                            }
                    }
                    

                    
                }else if((animal == "macaco" || animal == "hipopotamo") && recinto.bioma == "savana e rio"){

                    switch(recinto.animaisExistentes.length){
                        case 0: //vazio
                           if (livre >= animalInfo.tamanho * quantidade) {
                                recintoCompativel.push({ numero: recinto.numero, livre, valorTotal: recinto.tamanhoTotal })
                                break
                            }
                            break
                        default:
                            //predador
                            if(parceiro.includes("leao") || parceiro.includes("leopardo") || parceiro.includes("crocodilo")){
                            break
                            }
                            
                            // ocupado pela mesma especie
                            if(parceiro.includes(animal)){
                                if (livre >= animalInfo.tamanho * quantidade) {
                                    recintoCompativel.push({ numero: recinto.numero, livre, valorTotal: recinto.tamanhoTotal })
                                    break
                                }
                            }

                            // especie diferente
                            if (livre >= (animalInfo.tamanho * quantidade) + 1) {
                                recintoCompativel.push({ numero: recinto.numero, livre, valorTotal: recinto.tamanhoTotal })
                                return
                            }
                            break
                    }

                }
            }) 

            if(recintoCompativel.length > 0){
                recintoCompativel.sort((a, b) => a.numero - b.numero)
                resposta = recintoCompativel.map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.livre}, total: ${recinto.valorTotal})`).join("\n")
            }else{
                resposta = "Não há recinto viável"
            }
        }

        return console.log(resposta)
    }

}

new RecintosZoo().analisaRecintos('crocodilo', 1)

export { RecintosZoo as RecintosZoo }
