import "./PdfButton.style.css";
import pdf from "../../assets/whitepaper.pdf"


function PdfButton() {
  return (
    <>
    <div className="button-container">
      <button onClick={()=>{window.location.href = pdf}}>White Paper</button>
    </div>
      
    </>
  );
}

export { PdfButton };
