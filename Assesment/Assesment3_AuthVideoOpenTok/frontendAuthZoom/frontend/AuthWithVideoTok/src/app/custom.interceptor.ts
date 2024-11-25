import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('LocalData is', accessToken);
  let loggedUserData: any;

  if (accessToken != null) {
    loggedUserData = accessToken;
    console.log('LoginData', loggedUserData);
  }
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer${loggedUserData}`,
    },
  });
  return next(cloneRequest);
};
