import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollTop from '../components/Buttons/ScrollTop';
import QAScrollTop from '../components/Buttons/QAScrollTop';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  );
}

export function QuestionListLayOut() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <QAScrollTop />
    </>
  );
}
