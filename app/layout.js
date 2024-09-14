import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'PlantPal - Plant Identifier',
  description: 'Identify plants using AI technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-forest-green text-white py-4">
          <div className="container">
            <h1 className="text-center fw-bold">PlantPal</h1>
          </div>
        </header>
        <main className="container my-4">
          {children}
        </main>
        <footer className="bg-forest-green text-white py-3 mt-auto">
          <div className="container text-center">
            <p>&copy; 2024 PlantPal. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}