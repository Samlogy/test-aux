import { Request, Response, NextFunction } from 'express';

interface RequestAPI extends Request {
  apiVersion: string
}

const apiVersionMiddleware = (defaultVersion = 'v1') => {
  return (req: RequestAPI, res: Response, next: NextFunction) => {
    // Skip versioning for Swagger UI or any non-API routes
    if (req.path.includes('/api-docs') || req.path.includes('/swagger')) {
      return next();
    }

    let version: string | null = null;

    // Case 1: Check if the version is specified in the API path
    const versionMatch = req.path.match(/\/api\/(v[0-9]+)\//);
    if (versionMatch) {
      version = versionMatch[1]; // Extract version from the path
    }

    // Case 2: If version is not in the path, check the headers
    if (!version) {
      version = req.headers['x-api-version'] as string || null;
    }

    // Case 3: If no version is specified in the path or headers, use default version
    if (!version) {
      version = defaultVersion;
    }

    // Redirect the request to the correct version endpoint
    const newPath = req.originalUrl.replace(/\/api\/(v[0-9]+)?\//, `/api/${version}/`);
    console.log(`Redirecting to: ${newPath}`);
    
    req.url = newPath;  // Update the request path
    req.apiVersion = version;

    next(); // Continue to the next middleware or route handler
  };
};

export default apiVersionMiddleware;
