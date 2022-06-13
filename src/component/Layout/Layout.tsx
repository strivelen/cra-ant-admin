import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <div className="App">
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem'
          }}
        >
          <Link to="/home">Home</Link>| <Link to="/list">List</Link> |{' '}
          <Link to="/login">Login</Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
