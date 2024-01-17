import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import Button from '@mui/material/Button';

// @ts-ignore
const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response?.data)
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <Button style={{ marginTop: "12px" }} variant="contained" onClick={getUsers}>Получить пользователей</Button>
      </div>
    );
  }

  return (
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ!'}</h1>
      <h1>{store.user.isActivated ? `Аккаунт подтвержден по почте` : 'ПОДТВЕРДИТЕ АККАУНТ!'}</h1>
      <Button variant="contained" onClick={() => { store.logout() }}>
        Выйти
      </Button>
      <div>
        <Button style={{ marginTop: "12px" }} variant="contained" onClick={getUsers}>Получить пользователей</Button>
      </div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);
