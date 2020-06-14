const BasePage = ({children, className = ''}) => {
    return (
        <div className={`base-page-container ${className}`}>
            {children}
        </div>
    );
};

export default BasePage;