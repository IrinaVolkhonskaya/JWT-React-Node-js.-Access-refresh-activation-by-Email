import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { Context } from '../index';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);

    return (
        <div>
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email' />
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)}
                value={password}
                type='text'
                placeholder='Пароль' />
            <Button style={{ marginRight: "12px", marginLeft: "12px" }} variant="contained" onClick={() => store.login(email, password)}>Логин</Button>
            <Button variant="contained" onClick={() => store.registration(email, password)}>Регистрация</Button>

        </div>
    )
}

export default observer(LoginForm);