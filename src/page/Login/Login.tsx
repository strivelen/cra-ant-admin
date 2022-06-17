import { FC, FormEvent, FormEventHandler, ReactNode } from 'react';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { login } from 'features/user/userSlice';
import Config from 'app/config';
import styles from './login.module.less';

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
    dispatch(login({ email: user, password }));
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
      <Button type="primary" htmlType="submit" className={styles.submit}>
        登录
      </Button>
    </form>
  );
};

const LoginContainer: FC<Container> = ({ children }) => {
  return (
    <div className={styles.login_bg}>
      <div className={styles.login_container}>
        <h1 className={styles.login_title}>{Config.appName}</h1>
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
