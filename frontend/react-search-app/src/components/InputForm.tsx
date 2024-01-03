import React, { useState } from "react";
import axios from "axios";
import styles from "./InputForm.module.css";
import ClusteringAlgorithm from "./ClusteringAlgorithm";

export interface formDataProps {
  searchString: string;
  algorithm: string;
  kVal?: string;
  isOptK?: string;
}

const InputForm = () => {
  const [submitDisabled, setsubmitDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataProps | {}>();

  const handleAlgorithmChange = (selectedAlgo: String | null) => {
    setsubmitDisabled(selectedAlgo !== "kMeans");
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prevFormData = formData || {};
    const updatedFormData = {
      ...prevFormData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e);
    try {
      const response = await axios.post(
        "http://localhost:3000/search",
        formData
      );
      console.log("Response from backend:", response.data);

      // Handle the response data as needed
      // ...
    } catch (error) {
      console.error("Error submitting form:", error as Error);
    }
  };

  return (
    <div>
      <form className={styles.input}>
        <input
          type="text"
          placeholder="Eg. India"
          name="searchString"
          className={styles.inputSearch}
          onChange={handleFormDataChange}
        />

        <ClusteringAlgorithm
          onAlgorithmChange={handleAlgorithmChange}
          handleFormDataChange={handleFormDataChange}
        />

        <div>
          <button
            className={styles.inputSubmit}
            type="submit"
            disabled={submitDisabled}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
