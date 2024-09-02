const fs = require('fs');

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
}   

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

type Usuario = {
    nome: string;
    email: string;
    cpf: string;
    profissao?: string;
    endereco: Endereco | null;
}

type Endereco = {
    cep: string;
    rua: string;
    complemento?: string;
    bairro: string;
    cidade: string;
}

const cadastrarUsuario = (usuario: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];

    bd.push(usuario);

    escreverArquivo(bd);

    return usuario;
}

const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];

    const usuarios = bd.filter(usuario => {
        if (filtro) {
            return usuario.profissao === filtro;
        }

        return usuario;
    });

    return usuarios;
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => usuario.cpf === cpf);

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    return usuario;
}

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => usuario.cpf === cpf);

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
}

const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => usuario.cpf === cpf);

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    const exclusao = bd.filter(usuario => usuario.cpf !== cpf);
    escreverArquivo(exclusao);

    return usuario;
}

// cadastrarUsuario({
//     nome: 'Rafael',
//     email: 'rafa@teste.com',
//     cpf: '151518494454',
//     profissao: 'Programador',
//     endereco: null
// });

// const rafael = detalharUsuario('151518494454');
// const bd = lerArquivo();
// console.log(rafael, bd);

// atualizarUsuario('151518494454', {
//     nome: 'Rafael',
//     email: 'rafa@teste.com',
//     cpf: '151518494454',
//     profissao: 'Programador',
//     endereco: null
// });

// excluirUsuario('151518494454');