import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TrailingSlashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    
    // Don't redirect if it's the root path or already ends with a slash
    if (pathname !== '/' && !pathname.endsWith('/')) {
      // Check if it's a file by looking for a dot in the last segment
      const lastSegment = pathname.split('/').pop() || '';
      const hasExtension = lastSegment.includes('.');
      
      if (!hasExtension) {
        navigate(`${pathname}/${search}${hash}`, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
};

export default TrailingSlashRedirect;
