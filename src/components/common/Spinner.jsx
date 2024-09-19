// Spinner.jsx


const Spinner = () => (
  <div className="loader">

    {/* Aquí puedes usar un gif de carga o CSS para mostrar el spinner */}
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="20" stroke="#4A90E2" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
    <style jsx>{`
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg {
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Spinner;
