import React, { useContext, useState } from "react";
import { Download } from "lucide-react";
import Api from "../../context/Apicontext";
import styles from "../../assets/styles/ButtonApply.module.scss";
import AbonnementContext from "../../context/abonnementContext";
import { useAuth } from "../../context/userAuth";
const ApplyButton = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const { SOURCE } = useContext(Api);
  const { abonnement } = useContext(AbonnementContext);
  const { user } = useAuth();

  const handleGenerateCoverLetter = async () => {
    console.log(id);
    setIsLoading(true);
    try {
      // Simulating API call - replace with actual API endpoint
      const response = await fetch(`${SOURCE}/get_lettre_motivation/${id.id}`);
      const data = await response.text();

      const formattedText = data.replace(/\\n/g, "\n");

      const cleanerText = formattedText
        .split("\n")
        .filter((line) => line.trim() !== "") // Remove empty lines
        .map((line) => `<div>${line}</div>`)
        .join("");

      setCoverLetter(cleanerText);
      setShowPreview(true);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error generating cover letter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetter], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "cover-letter.docx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    setShowPreview(false);
  };

  const handleApplyNow = () => {
    let candidat_id = String(user.candidateId);
    console.log(candidat_id)
    fetch(`${SOURCE}/candidatures/${candidat_id}/${id.id}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // assuming the API response is an array
        confirm("Voulez, vous postuler ?");
      })
      .catch((error) => {
        console.log("Error fetching job offers:", error);
        // Important to set loading to false even on error
      });
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const FormattedText = ({ text }) => (
    <>
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );

  const FormattedText2 = ({ text }) => (
    <div style={{ whiteSpace: "pre-line" }}>{text}</div>
  );

  return (
    <div className={`${styles.apply_button_container}`}>
      <div className={`${styles.dropdown_container}`}>
        <button className={`${styles.apply_button}`} onClick={toggleDropdown}>
          Apply
        </button>

        {showDropdown && (
          <div className={`${styles.dropdown_menu}`}>
            <button
              className={`${styles.dropdown_item}`}
              onClick={handleApplyNow}
            >
              Apply Now
            </button>
            {abonnement.forfait != "Basic" ? (
              <button
                className={`${styles.dropdown_item}`}
                onClick={handleGenerateCoverLetter}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Generating..."
                ) : (
                  <span className={`${styles.with_icon}`}>
                    Generate Cover Letter
                    <Download className={`${styles.icon}`} />
                  </span>
                )}
              </button>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>

      {showPreview && (
        <div
          className={`${styles.dialog_overlay}`}
          onClick={() => setShowPreview(false)}
        >
          <div
            className={`${styles.dialog_content}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${styles.dialog_header}`}>
              <h2>Generated Cover Letter</h2>
              <button
                className={`${styles.close_button}`}
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>
            <div className={`${styles.preview_content}`}>
              <div className={`${styles.letter_content}`}>
                <div
                  dangerouslySetInnerHTML={{ __html: coverLetter }} // Use to render the formatted HTML
                />
              </div>
            </div>
            <div className={`${styles.dialog_footer}`}>
              <button
                className={`${styles.cancel_button}`}
                onClick={() => setShowPreview(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.download_button}`}
                onClick={handleDownload}
              >
                Download Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyButton;
