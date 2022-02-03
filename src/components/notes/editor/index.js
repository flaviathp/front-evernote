import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor(props) {
    const [currentContent, setCurrentContent] = useState('');
    // cria um timer para ver se o usuário parou de digitar
    const [timer, setTimer] = useState(null)

    // o início da nota é o título, selecionado através do slice
    // regex que remove as tags html do texto
    const updateNote = (content) => {
        const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30);
        props.updateNote(props.note, { 'title': title, 'body': content })
    }

    // cria um método para salvamento automático a partir do timer
    const handleChange = (content, delta, source) => {
        clearTimeout(timer);
        if (source === 'user') {
            setCurrentContent(content)
            setTimer(setTimeout(() => updateNote(content), 2000))
        }
    }

    useEffect(() => {
        setCurrentContent(props.note.body)
    }, [props.note])

    // ferramentas da toolbar do quill
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ]
    }

    return (
        <ReactQuill value={currentContent} onChange={handleChange} modules={modules} />
    )
}

export default Editor;