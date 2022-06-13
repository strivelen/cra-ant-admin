import { Link, Outlet, useParams } from 'react-router-dom';

export default function Home() {
  let invoices = [
    {
      name: 'Santa Monica',
      number: 1995,
      amount: '$10,800',
      due: '12/05/1995'
    },
    {
      name: 'Stankonia',
      number: 2000,
      amount: '$8,000',
      due: '10/31/2000'
    },
    {
      name: 'Ocean Avenue',
      number: 2003,
      amount: '$9,500',
      due: '07/22/2003'
    },
    {
      name: 'Tubthumper',
      number: 1997,
      amount: '$14,000',
      due: '09/01/1997'
    },
    {
      name: 'Wide Open Spaces',
      number: 1998,
      amount: '$4,600',
      due: '01/27/1998'
    }
  ];
  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem'
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{ display: 'block', margin: '1rem 0' }}
            to={`/home/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export function Num() {
  let params = useParams();
  return <h1>{params.num}</h1>;
}
