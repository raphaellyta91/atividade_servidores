import{curso}from '../models/modelCurso,js'

export const criarCurso = (req, res) => {
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
}

export function listarCursos (req, res){
    
    res.status(200).json(curso)
}
