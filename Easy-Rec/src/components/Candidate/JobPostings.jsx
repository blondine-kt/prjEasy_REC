import { useState, useEffect, useContext } from "react";
import styles from "../../assets/styles/ShowOffres.module.scss";
import Api from "../../context/Apicontext";
import ApplyButton from "./ButtonApply";

const JobListings = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { SOURCE } = useContext(Api);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch(`${SOURCE}/`)
      .then((response) => response.json())
      .then((data) => {
        setJobOffers(data.response); // assuming the API response is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job offers:", error);
        setLoading(false); // Important to set loading to false even on error
      });
  }, []);

  if (loading) {
    return <p>Loading job offers...</p>;
  }

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  console.log(jobOffers);

  const handleApply = (jobId) => {
    // Add your application logic here
    console.log(`Applied for job ${jobId}`);
  };
  // Example of updating the component to use these styles
  return (
    <div className={`${styles.job_listings_container}`}>
      <h1 className={`${styles.page_title}`}>Job Opportunities</h1>

      <div>
        {Array.isArray(jobOffers) ? (
          jobOffers.map((job) => (
            <div key={job.offre_id} className={`${styles.job_card}`}>
              <div
                className={`${styles.job_header}`}
                onClick={() => handleToggle(job.offre_id)}
              >
                <div>
                  <h2 className={`${styles.job_title}`}>Poste: {job.titre}</h2>
                  <p className={`${styles.job_salary}`}>
                    Salaire: {job.salaire}
                  </p>
                </div>
                <div className={`${styles.button_container}`}>
                  {/* <button 
                  className={`${styles.apply_button}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(job.offre_id);
                  }}
                >
                  Postuler
                </button> */}
                  <ApplyButton id={String(job.offre_id)} />
                </div>
              </div>

              {expandedId === job.offre_id && (
                <div className={`${styles.job_details}`}>
                  <div className={`${styles.description_section}`}>
                    <h3 className={`${styles.section_title}`}>Description</h3>
                    <p className={`${styles.description_text}`}>
                      {job.description}
                    </p>
                  </div>

                  <div>
                    <h3 className={`${styles.section_title}`}>
                      Competences Requis
                    </h3>
                    <p
                      key={job.offre_id}
                      className={`${styles.competency_item}`}
                    >
                      {job.competences}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default JobListings;
