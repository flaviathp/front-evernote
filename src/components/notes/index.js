import React, { useState, useEffect } from 'react';
import { Column } from 'rbx';
import '../../style/notes.scss';
import { push as Menu } from 'react-burger-menu';
import List from '../notes/list';
import Editor from '../notes/editor';
import NotesService from '../../services/notes';


const Notes = (props) => {
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrentNote] = useState({ title: "", body: "", id: "" });


    async function fetchNotes() {
        // busca as notas na API
        const response = await NotesService.index();
        // verifica se tem uma nota que corresponde a requisição e retorna o resultado
        if (response.data.length >= 1) {
            // reverse mostra da nota mais nova para mais antiga
            setNotes(response.data.reverse())
            // coloca a nota mais nova em evidência
            setCurrentNote(response.data[0])
        } else {
            setNotes([]);
        }
    }

    // método do component list que seleciona as notas
    const selectNote = (id) => {
        const note = notes.find((note) => {
            return note._id === id;
        })
        setCurrentNote(note);
    };

    // criar novas notas pela interface
    const createNote = async () => {
        await NotesService.create();
        // depois de criar a nota chama o método de listagem de notas, para atualizar 
        fetchNotes();
    }

    // deletando uma nota pela interface
    const deleteNote = async (note) => {
        await NotesService.delete(note._id);
        fetchNotes();
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <Column.Group className="notes" id="notes">
                <Menu
                    pageWrapId={"notes-editor"}
                    isOpen={props.isOpen}
                    onStateChange={(state) => props.setIsOpen(state.isOpen)}
                    disableAutoFocus
                    outerContainerId={"notes"}
                    customBurgerIcon={false}
                    customCrossIcon={false}
                >
                    <Column.Group>
                        <Column size={10} offset={1}>
                            Search...
                        </Column>
                    </Column.Group>
                    <List
                        notes={notes}
                        selectNote={selectNote}
                        createNote={createNote}
                        deleteNote={deleteNote}
                        current_note={current_note} />
                </Menu>


                <Column size={12} className="notes-editor" id="notes-editor">
                    <Editor note={current_note}/>
                </Column>
            </Column.Group>
        </>
    )

};

export default Notes;