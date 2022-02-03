import React, { useState, useEffect } from 'react';
import { Column } from 'rbx';
import '../../style/notes.scss';
import { push as Menu } from 'react-burger-menu';
import List from '../notes/list';
import NotesService from '../../services/notes';


const Notes = (props) => {
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrentNote] = useState({ title: "", body: "", id: "" });

    
    async function fetchNotes() {
        // busca as notas na API
        const response = await NotesService.index();
        // verifica se tem mais de uma nota que corresponde a requisição
        if (response.data.length >= 1) {
            // reverse mostra da nota mais nova para mais antiga
            setNotes(response.data.reverse())
            // coloca a nota mais nova em evidência
            setCurrentNote(response.data[0])
        }
    }
    
    // método do component list que seleciona as notas
    const selectNote = (id) => {
        const note = notes.find((note) => {
            return note._id === id;
        })
        setCurrentNote(note);
    };
    
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
                        current_note={current_note} />
                </Menu>


                <Column size={12} className="notes-editor" id="notes-editor">
                    Editor...
                </Column>
            </Column.Group>
        </>
    )

};

export default Notes;