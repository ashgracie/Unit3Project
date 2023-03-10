import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <a href="/">Signout</a>
    </nav>
  );
}