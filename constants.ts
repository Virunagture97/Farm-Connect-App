import { WorkType, Language, ApplicationStatus } from './types';

export const WORK_TYPES: WorkType[] = [
  WorkType.CottonPlucking,
  WorkType.Sowing,
  WorkType.Spraying,
  WorkType.Weeding,
  WorkType.Harvesting,
];

type TranslationStrings = {
  [key: string]:
    | { [key in Language]: string }
    | { [key in WorkType]: { [key in Language]:string } }
    | { [key in ApplicationStatus]: { [key in Language]: string } };
};

export const translations: TranslationStrings = {
  // Roles
  farmer: { en: 'Farmer', mr: 'शेतकरी' },
  worker: { en: 'Worker', mr: 'कामगार' },

  // General UI
  jobBoard: { en: 'Krishi Job Board', mr: 'कृषी जॉब बोर्ड' },
  language: { en: 'Language', mr: 'भाषा' },
  role: { en: 'Role', mr: 'भूमिका' },
  day: { en: 'per day', mr: 'प्रति दिवस' },
  contact: { en: 'Contact', mr: 'संपर्क' },
  town: { en: 'Town/Village', mr: 'शहर/गाव' },
  apply: { en: 'Apply', mr: 'अर्ज करा' },
  callNow: { en: 'Call Now', mr: 'आता कॉल करा' },
  copied: { en: 'Copied!', mr: 'कॉपी केले!' },
  copyNumber: { en: 'Copy Number', mr: 'नंबर कॉपी करा' },
  lat: { en: 'Lat', mr: 'अक्षांश' },
  lon: { en: 'Lon', mr: 'रेखांश' },
  logout: { en: "Logout", mr: "लॉग आउट" },
  withdraw: { en: 'Withdraw', mr: 'मागे घ्या' },
  kmAway: { en: '{distance} km away', mr: '{distance} किमी दूर' },

  // Farmer View
  postNewJob: { en: 'Post a New Job', mr: 'नवीन नोकरी पोस्ट करा' },
  applications: { en: 'Applications', mr: 'अर्ज' },
  farmerName: { en: 'Your Name', mr: 'तुमचे नाव' },
  enterFarmerName: { en: 'Enter your name', mr: 'तुमचे नाव टाका' },
  farmerContact: { en: 'Your Contact Number', mr: 'तुमचा संपर्क क्रमांक' },
  enterFarmerContact: { en: 'Enter your contact number', mr: 'तुमचा संपर्क क्रमांक टाका' },
  workType: { en: 'Type of Work', mr: 'कामाचा प्रकार' },
  selectWorkType: { en: 'Select type of work', mr: 'कामाचा प्रकार निवडा' },
  dailyWage: { en: 'Daily Wage (₹)', mr: 'रोजची मजुरी (₹)' },
  enterWage: { en: 'Enter daily wage', mr: 'रोजची मजुरी टाका' },
  jobLocation: { en: 'Job Location Name', mr: 'नोकरीच्या ठिकाणाचे नाव' },
  enterLocationName: { en: 'Enter town/village name', mr: 'शहर/गावाचे नाव टाका' },
  jobCoordinates: { en: 'Job Coordinates', mr: 'नोकरीचे समन्वय' },
  coordinatesDesc: { en: 'Please be at the job location when you click this.', mr: 'कृपया हे क्लिक करताना नोकरीच्या ठिकाणी रहा.' },
  gettingLocation: { en: 'Getting Location...', mr: 'स्थान मिळवत आहे...' },
  getCoordinates: { en: "Get Farm's GPS Location", mr: 'शेताचे जीपीएस स्थान मिळवा' },
  postingJob: { en: 'Posting Job...', mr: 'नोकरी पोस्ट करत आहे...' },
  postJob: { en: 'Post Job', mr: 'नोकरी पोस्ट करा' },
  jobPostedSuccess: { en: 'Job posted successfully!', mr: 'नोकरी यशस्वीरित्या पोस्ट झाली!' },
  noJobsPosted: { en: 'You have not posted any jobs yet.', mr: 'तुम्ही अजून कोणतीही नोकरी पोस्ट केलेली नाही.' },
  noApplications: { en: 'No applications received for this job yet.', mr: 'या नोकरीसाठी अद्याप कोणतेही अर्ज आलेले नाहीत.' },
  accept: { en: 'Accept', mr: 'स्वीकारा' },
  reject: { en: 'Reject', mr: 'नाकारा' },
  workerName: { en: 'Worker Name', mr: 'कामगाराचे नाव' },
  withdrawJob: { en: 'Withdraw Job', mr: 'नोकरी मागे घ्या' },
  appWithdrawnNotification: { en: `The application from '{workerName}' for your '{jobName}' job has been withdrawn.`, mr: `तुमच्या '{jobName}' नोकरीसाठी '{workerName}' कडून आलेला अर्ज मागे घेण्यात आला आहे.` },
  filled: { en: 'Filled', mr: 'भरले' },
  jobFilledNotification: { en: `The position for '{jobName}' has been filled. Thank you for your application.`, mr: `'{jobName}' साठीची जागा भरली आहे. तुमच्या अर्जाबद्दल धन्यवाद.` },
  applicationAcceptedNotification: { en: `Congratulations! Your application for '{jobName}' has been accepted. The farmer will contact you soon.`, mr: `अभिनंदन! '{jobName}' साठी तुमचा अर्ज स्वीकारण्यात आला आहे. शेतकरी लवकरच तुमच्याशी संपर्क साधतील.` },

  // Worker View
  availableJobs: { en: 'Available Jobs', mr: 'उपलब्ध नोकऱ्या' },
  myApplications: { en: 'My Applications', mr: 'माझे अर्ज' },
  noJobsAvailable: { en: 'No jobs available right now. Please check back later.', mr: 'सध्या कोणत्याही नोकऱ्या उपलब्ध नाहीत. कृपया नंतर पुन्हा तपासा.' },
  applyForThisJob: { en: 'Apply for this Job', mr: 'या नोकरीसाठी अर्ज करा' },
  yourName: { en: 'Your Name', mr: 'तुमचे नाव' },
  yourContact: { en: 'Your Contact Number', mr: 'तुमचा संपर्क क्रमांक' },
  submitApplication: { en: 'Submit Application', mr: 'अर्ज सादर करा' },
  submitting: { en: 'Submitting...', mr: 'सादर करत आहे...' },
  applicationSubmitted: { en: 'Application Submitted!', mr: 'अर्ज यशस्वीरित्या सादर झाला!' },
  applicationSubmittedDesc: { en: 'The farmer will contact you if they choose to proceed.', mr: 'शेतकरी पुढे जाण्यास निवडल्यास तुमच्याशी संपर्क साधतील.' },
  close: { en: 'Close', mr: 'बंद करा' },
  hasAcceptedJob: { en: 'You have an accepted job offer and cannot apply for new jobs.', mr: 'तुमच्याकडे स्वीकृती नोकरीची ऑफर आहे आणि तुम्ही नवीन नोकरीसाठी अर्ज करू शकत नाही.' },
  noApplicationsYet: { en: 'You have not applied for any jobs yet.', mr: 'तुम्ही अद्याप कोणत्याही नोकरीसाठी अर्ज केलेला नाही.' },
  applicationStatusLabel: { en: 'Application Status', mr: 'अर्जाची स्थिती' },
  applicationLocked: { en: 'Application Locked', mr: 'अर्ज लॉक केला' },
  withdrawApplication: { en: 'Withdraw Application', mr: 'अर्ज मागे घ्या' },
  jobWithdrawnNotification: { en: `The job '{jobName}' at '{location}' has been withdrawn by the farmer.`, mr: `'{location}' येथील '{jobName}' ही नोकरी शेतकऱ्याने मागे घेतली आहे.` },
  searchLocation: { en: 'Enter a town or city to search near', mr: 'जवळपास शोधण्यासाठी शहर किंवा गाव टाका' },
  search: { en: 'Search', mr: 'शोधा' },
  searching: { en: 'Searching...', mr: 'शोधत आहे...' },
  useMyCurrentLocation: { en: 'Use My Current Location', mr: 'माझे वर्तमान स्थान वापरा' },
  locationNotFound: { en: 'Location not found. Please try another search.', mr: 'स्थान सापडले नाही. कृपया दुसरा शोध करून पहा.' },
  searchError: { en: 'An error occurred during search.', mr: 'शोधताना एक त्रुटी आली.' },
  
  // Login Page
  iamA: { en: "I am a...", mr: "मी आहे..." },
  enterPhoneNumber: { en: 'Enter your phone number to continue', mr: 'पुढे जाण्यासाठी तुमचा फोन नंबर टाका' },
  phoneNumber: { en: 'Phone Number', mr: 'फोन नंबर' },
  continue: { en: 'Continue', mr: 'पुढे जा' },

  // Notifications
  notifications: { en: 'Notifications', mr: 'सूचना' },
  noNotifications: { en: 'No new notifications.', mr: 'नवीन सूचना नाहीत.' },
  markAsRead: { en: 'Mark as read', mr: 'वाचले म्हणून चिन्हांकित करा' },

  // Settings
  settings: { en: 'Settings', mr: 'सेटिंग्ज' },
  appMode: { en: 'App Mode', mr: 'अॅप मोड' },
  light: { en: 'Light', mr: 'लाईट' },
  dark: { en: 'Dark', mr: 'डार्क' },
  fontSize: { en: 'Font Size', mr: 'फॉन्ट आकार' },
  small: { en: 'Small', mr: 'लहान' },
  medium: { en: 'Medium', mr: 'मध्यम' },
  large: { en: 'Large', mr: 'मोठा' },

  // Work Types
  workTypes: {
    [WorkType.CottonPlucking]: { en: 'Cotton Plucking', mr: 'कापूस वेचणी' },
    [WorkType.Sowing]: { en: 'Sowing', mr: 'पेरणी' },
    [WorkType.Spraying]: { en: 'Spraying', mr: 'फवारणी' },
    [WorkType.Weeding]: { en: 'Weeding', mr: 'खुरपणी' },
    [WorkType.Harvesting]: { en: 'Harvesting', mr: 'कापणी' },
  },

  // Application Status
  applicationStatus: {
    [ApplicationStatus.Pending]: { en: 'Pending', mr: 'प्रलंबित' },
    [ApplicationStatus.Accepted]: { en: 'Accepted', mr: 'स्वीकृत' },
    [ApplicationStatus.Rejected]: { en: 'Rejected', mr: 'नाकारले' },
  }
};
