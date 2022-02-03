import React, { useState } from 'react';
import { Button, Field, Control, Input, Column, Label, Help } from 'rbx';
import { Navigate } from 'react-router-dom';
import UsersService from '../../../services/users';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToRegister, setRedirectToRegister] = useState(false);
    const [redirectToNotes, setRedirectToNotes] = useState(false);
    const [error, setError] = useState(false);

    if(redirectToRegister === true) {
        return <Navigate replace to="/register" />
    } else if (redirectToNotes === true) {
        return <Navigate replace to="/notes" />
    }

    // método para o submit, envia os dados para a API
    const HandleSubmit = async (evt) => {
        // impede que a ação padrão do evento aconteça, por exemplo, clicar em enviar impede que envie o formulário
        evt.preventDefault();
        
        try {
            // recebe os valores de name, email e password e envia para a API
            await UsersService.login({ email: email, password: password });
            // se der certo redireciona para o login
            setRedirectToNotes(true);
        } catch (error) {
            // se der errado retorna o erro
            setError(true);
        }
    };

    return (
        <>
            <Column.Group centered>
                <form onSubmit={HandleSubmit}>
                    <Column size={12}>
                        <Field>
                            <Label size="small">Email:</Label>
                            <Control>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    value={ email }
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Password:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    value={ password }
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <a onClick={e => setRedirectToRegister(true)} className="button is-white has-text-custom-purple">Register or</a>
                                    </Column>
                                    <Column>
                                        <Button color="custom-purple" outlined>Login</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>

                        {error && <Help color="danger">Email or Password invalid</Help>}

                    </Column>
                </form>
            </Column.Group>
        </>
    )
};

export default LoginForm;