import { FC, FormEvent, FormEventHandler, ReactNode } from 'react';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setToken, login, selectToken } from 'features/user/userSlice';
import styles from './login.module.less';
import { persistor } from 'app/store';

interface Container {
  children: ReactNode;
}

interface FormItem {
  icon: ReactNode;
  children: ReactNode;
}

const LoginFormItem: FC<FormItem> = ({ icon, children }) => {
  return (
    <div className={styles.form_item}>
      {icon}
      {children}
      <span className={styles.line} />
    </div>
  );
};

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const onSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    const login_form = document.getElementById('login_form') as HTMLFormElement;
    const formData = new FormData(login_form);
    const user = formData.get('user') as string;
    const password = formData.get('password') as string;
    dispatch(login({ username: user, password: password }));
  };
  return (
    <form id="login_form" onSubmit={onSubmit}>
      <LoginFormItem icon={<UserOutlined className={styles.icon} />}>
        <input
          autoComplete="off"
          type="text"
          placeholder="请输入用户名"
          name="user"
        />
      </LoginFormItem>
      <LoginFormItem icon={<UnlockOutlined className={styles.icon} />}>
        <input type="password" placeholder="请输入密码" name="password" />
      </LoginFormItem>
      {/* <div className={styles.forgot_password}>忘记密码？</div> */}
      {/* <button type="submit" className={styles.submit}>
        登录
      </button> */}
      <Button type="primary" htmlType="submit" className={styles.submit}>
        登录
      </Button>
    </form>
  );
};

const LoginContainer: FC<Container> = ({ children }) => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.login_bg}>
      <div className={styles.login_container}>
        <h1
          className={styles.login_title}
          onClick={() => {
            persistor.purge();
          }}
        >
          Admin Name
        </h1>
        <h2>
          {token ? '已登录：' : '未登录'} {token}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default function Login() {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
}
