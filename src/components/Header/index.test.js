import { render, screen } from '@testing-library/react';
import Header from './index';

test('render Navbar component', ()=>{
    render(<Header />)
    expect(screen.getByText('Kitchen Master')).toBeInTheDocument();
});