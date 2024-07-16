import { createRoot } from 'react-dom/client';
import HomePage from './page/home-page';

const root = createRoot(document.getElementById('main'));
root.render(<HomePage />);