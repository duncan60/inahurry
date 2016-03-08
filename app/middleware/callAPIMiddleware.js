import 'isomorphic-fetch';
export default function callAPIMiddleware (){
    return next=> action =>{
        const { fetchAPI, types, ...rest } = action;
        if (!fetchAPI) {
            return next(action);
        }
        const [SUCCESS, FAILURE] = types;
        return fetch(fetchAPI)
            .then(response =>response.json().then(json => ({ json, response })))
            .then(({ json, response }) => {
                if (response.status === 200) {
                    next(SUCCESS(json));
                } else {
                    next(FAILURE());
                }

            })
            .catch((err) => {
                next(FAILURE());
            });
    };
}
