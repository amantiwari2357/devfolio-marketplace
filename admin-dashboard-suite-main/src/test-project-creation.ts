import api from './services/api';

const testCreateProject = async () => {
  try {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No token found! Please login first.');
      alert('Please login first before creating a project');
      window.location.href = '/login';
      return;
    }

    console.log('✅ Token found:', token.substring(0, 20) + '...');

    const projectData = {
      clientName: "Aman Kumar",
      email: "amankumartiwari5255@gmail.com",
      phone: "+919031359720",
      companyName: "BookTech",
      projectName: "E-Commerce Platform",
      projectType: "App",
      techStack: "Next.js",
      startDate: "2025-11-01",
      deadline: "2025-12-08",
      totalAmount: 8000
    };

    console.log('📤 Sending project data:', projectData);

    const response = await api.post('/client-onboarding-projects', projectData);

    console.log('✅ Project created successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error creating project:', error.response?.data || error.message);
    throw error;
  }
};

// Make function available in browser console
if (typeof window !== 'undefined') {
  (window as any).testCreateProject = testCreateProject;
  console.log('✨ testCreateProject() is ready to use in console');
}

export default testCreateProject;
