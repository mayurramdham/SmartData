import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {


   req = req.clone({
    setHeaders: {
      'Authorization': 'Bearer your-token', 
    }
  });

  return next(req);
};
