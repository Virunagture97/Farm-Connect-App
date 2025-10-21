import React, { useState, useEffect, useMemo } from 'react';
import { UserRole, Language, Job, WorkType, Application, ApplicationStatus, Notification, Settings, AppMode, FontSize } from './types';
import LoginPage from './components/LoginPage';
import FarmerView from './components/FarmerView';
import WorkerView from './components/WorkerView';
import Header from './components/Header';
import { translations } from './constants';

const dummyJobs: Job[] = [
  { id: '1', workType: WorkType.CottonPlucking, dailyWage: 450, locationName: 'Yavatmal, Maharashtra', location: { latitude: 20.3888, longitude: 78.1303 }, farmerName: 'Ramesh Patil', farmerContact: '9876543210' },
  { id: '2', workType: WorkType.Sowing, dailyWage: 400, locationName: 'Akola, Maharashtra', location: { latitude: 20.7009, longitude: 77.0081 }, farmerName: 'Suresh Deshmukh', farmerContact: '9876543211' },
  { id: '3', workType: WorkType.Weeding, dailyWage: 350, locationName: 'Amravati, Maharashtra', location: { latitude: 20.9374, longitude: 77.7796 }, farmerName: 'Gita Pawar', farmerContact: '9876543212' },
];

type AuthStep = 'role' | 'identify' | 'loggedIn';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(() => localStorage.getItem('userRole') as UserRole | null);
  const [currentUserIdentifier, setCurrentUserIdentifier] = useState<string | null>(() => localStorage.getItem('currentUserIdentifier'));
  const [authStep, setAuthStep] = useState<AuthStep>(() => (userRole && currentUserIdentifier) ? 'loggedIn' : 'role');
  
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      language: Language.English,
      mode: AppMode.Light,
      fontSize: FontSize.Base,
    };
  });
  
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : dummyJobs;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const savedApps = localStorage.getItem('applications');
    return savedApps ? JSON.parse(savedApps) : [];
  });
  
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifs = localStorage.getItem('notifications');
    return savedNotifs ? JSON.parse(savedNotifs) : [];
  });

  useEffect(() => { userRole ? localStorage.setItem('userRole', userRole) : localStorage.removeItem('userRole'); }, [userRole]);
  useEffect(() => { currentUserIdentifier ? localStorage.setItem('currentUserIdentifier', currentUserIdentifier) : localStorage.removeItem('currentUserIdentifier'); }, [currentUserIdentifier]);
  useEffect(() => { localStorage.setItem('jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('notifications', JSON.stringify(notifications)); }, [notifications]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.mode === AppMode.Dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    if (settings.fontSize === FontSize.Small) root.style.fontSize = '14px';
    else if (settings.fontSize === FontSize.Large) root.style.fontSize = '18px';
    else root.style.fontSize = '16px';

    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const handleSettingsChange = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    setAuthStep('identify');
  };

  const handleIdentify = (identifier: string) => {
    setCurrentUserIdentifier(identifier);
    setAuthStep('loggedIn');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUserIdentifier(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUserIdentifier');
    setAuthStep('role');
  };

  const handleLanguageChange = (lang: Language) => handleSettingsChange({ language: lang });

  const handlePostJob = (newJobData: Omit<Job, 'id'>) => {
    const newJob: Job = { ...newJobData, id: new Date().toISOString() };
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleApplyForJob = async (jobId: string, workerName: string) => {
    if (!currentUserIdentifier) return; // Should not happen if logged in
    const newApplication: Application = {
      id: new Date().toISOString(),
      jobId,
      workerName,
      workerContact: currentUserIdentifier,
      status: ApplicationStatus.Pending,
    };
    setApplications(prev => [...prev, newApplication]);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1000));
  };

  const handleUpdateApplicationStatus = (applicationId: string, status: ApplicationStatus) => {
    if (status === ApplicationStatus.Accepted) {
      const appToAccept = applications.find(a => a.id === applicationId);
      if (!appToAccept) return;
      
      const jobToFill = jobs.find(j => j.id === appToAccept.jobId);
      if (!jobToFill) return;

      const newNotifications: Notification[] = [];
      
      // Notify accepted worker
      newNotifications.push({
        id: `${new Date().toISOString()}-accepted`,
        recipientContact: appToAccept.workerContact,
        read: false,
        message: translations.applicationAcceptedNotification[settings.language]
          .replace('{jobName}', translations.workTypes[jobToFill.workType][settings.language])
      });
      
      const updatedApplications = applications.map(app => {
        if (app.jobId === jobToFill.id) {
          if (app.id === applicationId) {
            return { ...app, status: ApplicationStatus.Accepted };
          } else if (app.status === ApplicationStatus.Pending) {
             // Notify other pending applicants
            newNotifications.push({
              id: `${new Date().toISOString()}-${app.id}-filled`,
              recipientContact: app.workerContact,
              read: false,
              message: translations.jobFilledNotification[settings.language]
                .replace('{jobName}', translations.workTypes[jobToFill.workType][settings.language])
            });
            return { ...app, status: ApplicationStatus.Rejected };
          }
        }
        return app;
      });

      const updatedJobs = jobs.map(j => j.id === jobToFill.id ? { ...j, isFilled: true } : j);

      setJobs(updatedJobs);
      setApplications(updatedApplications);
      setNotifications(prev => [...prev, ...newNotifications]);
      
    } else { // Handle simple rejection
      setApplications(apps => apps.map(app => app.id === applicationId ? { ...app, status } : app));
    }
  };
  
  const handleWithdrawJob = (jobId: string) => {
    const jobToWithdraw = jobs.find(j => j.id === jobId);
    if (!jobToWithdraw) return;

    // Notify all applicants
    const affectedApplications = applications.filter(app => app.jobId === jobId);
    const newNotifications: Notification[] = affectedApplications.map(app => ({
      id: `${new Date().toISOString()}-${app.workerContact}`,
      recipientContact: app.workerContact,
      read: false,
      message: translations.jobWithdrawnNotification[settings.language]
        .replace('{jobName}', translations.workTypes[jobToWithdraw.workType][settings.language])
        .replace('{location}', jobToWithdraw.locationName),
    }));
    setNotifications(prev => [...prev, ...newNotifications]);

    // Remove job and its applications
    setJobs(prev => prev.filter(j => j.id !== jobId));
    setApplications(prev => prev.filter(app => app.jobId !== jobId));
  };
  
  const handleWithdrawApplication = (applicationId: string) => {
    const appToWithdraw = applications.find(a => a.id === applicationId);
    if (!appToWithdraw) return;
    
    const relatedJob = jobs.find(j => j.id === appToWithdraw.jobId);
    if (!relatedJob) return;

    // Notify the farmer
    const newNotification: Notification = {
      id: new Date().toISOString(),
      recipientContact: relatedJob.farmerContact,
      read: false,
      message: translations.appWithdrawnNotification[settings.language]
        .replace('{workerName}', appToWithdraw.workerName)
        .replace('{jobName}', translations.workTypes[relatedJob.workType][settings.language]),
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // Remove application
    setApplications(prev => prev.filter(a => a.id !== applicationId));
  };
  
  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const currentUserNotifications = useMemo(() => {
    if (!currentUserIdentifier) return [];
    return notifications
      .filter(n => n.recipientContact === currentUserIdentifier)
      .sort((a,b) => (a.read === b.read) ? 0 : a.read ? 1 : -1); // Unread first
  }, [notifications, currentUserIdentifier]);

  const IdentificationGate = () => {
    const [identifier, setIdentifier] = useState('');
    const t = (key: keyof typeof translations) => translations[key][settings.language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(identifier.trim()){
            handleIdentify(identifier.trim());
        }
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
            {t('enterPhoneNumber')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('phoneNumber')}
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="1234567890"
                required
                pattern="\d{10}"
                title="Please enter a 10-digit phone number"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('continue')}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (authStep) {
      case 'role':
        return <LoginPage onSelectRole={handleSelectRole} language={settings.language} onLanguageChange={handleLanguageChange} />;
      case 'identify':
        return <IdentificationGate />;
      case 'loggedIn':
        if (!userRole || !currentUserIdentifier) {
            handleLogout(); // Should not happen, but as a safeguard
            return null;
        }
        return (
          <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Header
              language={settings.language}
              onLanguageChange={handleLanguageChange}
              userRole={userRole}
              onLogout={handleLogout}
              notifications={currentUserNotifications}
              onMarkNotificationAsRead={handleMarkNotificationAsRead}
              settings={settings}
              onSettingsChange={handleSettingsChange}
            />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
              {userRole === UserRole.Farmer && (
                <FarmerView
                  language={settings.language}
                  onPostJob={handlePostJob}
                  farmerContactNumber={currentUserIdentifier}
                  allJobs={jobs}
                  allApplications={applications}
                  onUpdateApplicationStatus={handleUpdateApplicationStatus}
                  onWithdrawJob={handleWithdrawJob}
                />
              )}
              {userRole === UserRole.Worker && (
                <WorkerView
                  jobs={jobs}
                  language={settings.language}
                  onApply={handleApplyForJob}
                  workerContactNumber={currentUserIdentifier}
                  allApplications={applications}
                  onWithdrawApplication={handleWithdrawApplication}
                />
              )}
            </main>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default App;
