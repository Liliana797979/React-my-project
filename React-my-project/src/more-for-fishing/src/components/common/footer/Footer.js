import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer-expand-md navbar-dark bg-primary">
            <div>
            <p>{new Date().getFullYear()} More for Fishing</p>
            </div>
        </footer>
    );
};