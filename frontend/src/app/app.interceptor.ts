import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const AppInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const url = req.urlWithParams.split('/').filter(x => x !== '').join('/');

    return next(req.clone({ url: `api/${ url }`}));
};
