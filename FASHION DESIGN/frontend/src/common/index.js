const backendDomain = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,  // Added URL for signIn
    method: "post",
  },
  AddDesign: {
    url: `${backendDomain}/api/save-design`,  // Corrected string interpolation
    method: "post",
  },
  GetDesign: {
    url: `${backendDomain}/api/getDesign`,  // Corrected string interpolation
    method: "get",
  },
};

export default SummaryApi;
