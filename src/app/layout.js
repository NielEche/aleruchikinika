import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';



export default function RootLayout({ children }) {
  return (
    <>
      <Header /> {/* Import your header here */}
      {children}
    </>
  );
}
