import express from 'express'
import path from 'path'
import express from 'express'

const routCurso = express.Router()

let cursos = [
    {
        codigo: '001',
        nome: 'Desenvolvimento de Sistemas',
        cargaHoraria: 1200
    }
]

// Listar cursos
routCurso.get('/cursos', (req, res) => {
    res.status(200).json(cursos)
})

// Buscar curso pelo código
routCurso.get('/curso/:codigo', (req, res) => {
    const cursoEncontrado = cursos.find(c => c.codigo === req.params.codigo)

    if (!cursoEncontrado) {
        return res.status(404).json({
            mensagem: 'Curso não encontrado!'
        })
    }

    res.status(200).json(cursoEncontrado)
})

// Cadastrar curso
routCurso.post('/curso', (req, res) => {
    const { codigo, nome, cargaHoraria } = req.body

    if (!codigo || !nome || !cargaHoraria) {
        return res.status(400).json({
            mensagem: 'Preencha todos os dados!'
        })
    }

    const novoCurso = {
        codigo,
        nome,
        cargaHoraria
    }

    cursos.push(novoCurso)

    res.status(200).json({
        mensagem: 'Curso cadastrado com sucesso!',
        novoCurso
    })
})

// Atualizar curso
routCurso.put('/curso/:codigo', (req, res) => {
    const cursoEncontrado = cursos.find(c => c.codigo === req.params.codigo)

    if (!cursoEncontrado) {
        return res.status(404).json({
            mensagem: 'Curso não encontrado!'
        })
    }

    const { nome, cargaHoraria } = req.body

    cursoEncontrado.nome = nome
    cursoEncontrado.cargaHoraria = cargaHoraria

    res.status(200).json({
        mensagem: 'Curso atualizado com sucesso!',
        cursoEncontrado
    })
})

// Deletar curso
routCurso.delete('/curso/:codigo', (req, res) => {
    const cursoEncontrado = cursos.findIndex(c => c.codigo === req.params.codigo)

    if (cursoEncontrado === -1) {
        return res.status(404).json({
            mensagem: 'Curso não encontrado!'
        })
    }

    cursos.splice(cursoEncontrado, 1)

    res.status(200).json({
        mensagem: 'Curso removido com sucesso!'
    })
})

export default routCurso