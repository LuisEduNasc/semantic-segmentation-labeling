import { Outlet } from 'react-router-dom';

import Header from '@/components/header';
import Container from '@/components/ui/container';
import Footer from '@/components/footer';

export const Layout = () => {
  return (
    <div>
      <Header />
      <Container>
        <div className='min-h-screen flex flex-col'>
          <Outlet />
        </div>
      </Container>
      <Footer />
    </div>
  );
};
