import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RemoveWrapperInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Check if the request has a body and if it has an "issue" property
        if (request.body && request.body.issue) {
            // Replace the request body with the "issue" property
            request = request.clone({
                body: request.body.issue,
            });
        }

        if (request.body && request.body.userDetails) {
            // Replace the request body with the "issue" property
            request = request.clone({
                body: request.body.userDetails,
            });
        }

        return next.handle(request);
    }
}

//Esta clase está porque para editar un ISSUE se enviaba el payload con un wrapper "issue" que el backend no aceptaba,
//Esto de aquí intercepta la petición y elimina ese wrapper para que la petición sea aceptada por el backend.

// Antes de interceptar:
// {
//     "issue":
//     {
//         "id": 1,
//             "fechaProgramada": "2023-11-29",
//                 "fechaRealizacion": null,
//                     "anotaciones": "Esta revisión es una de prueba",
//                         "estacion": {
//             "id": "c7af6951-0967-407d-a6cd-20d79904ee57",
//                 "number": 1,
//                     "name": "Plaza de Armas",
//                         "coordinates": "",
//                             "capacity": 10,
//                                 "bikes": 6
//         },
//         "trabajador": {
//             "id": "c0a83801-8c0b-1d26-818c-0b6d330c0000",
//                 "email": "admin@bikeapp.com",
//                     "nombre": "admin"
//         },
//         "estado": "IN_PROGRESS"
//     }
// }

// Después de interceptar:
// {
//     "id": 1,
//         "fechaProgramada": "2023-11-29",
//             "fechaRealizacion": null,
//                 "anotaciones": "Esta revisión es una de prueba",
//                     "estacion": {
//         "id": "c7af6951-0967-407d-a6cd-20d79904ee57",
//             "number": 1,
//                 "name": "Plaza de Armas",
//                     "coordinates": "",
//                         "capacity": 10,
//                             "bikes": 6
//     },
//     "trabajador": {
//         "id": "c0a83801-8c0b-1d26-818c-0b6d330c0000",
//             "email": "admin@bikeapp.com",
//                 "nombre": "admin"
//     },
//     "estado": "IN_PROGRESS"
// }