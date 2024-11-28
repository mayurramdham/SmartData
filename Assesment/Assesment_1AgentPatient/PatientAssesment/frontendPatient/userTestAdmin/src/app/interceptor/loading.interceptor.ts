import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../servies/loader.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingServies = inject(LoaderService);
  loadingServies.show();
  return next(req).pipe(
    finalize(() => {
      loadingServies.hide();
    })
  );
};

//finalize 