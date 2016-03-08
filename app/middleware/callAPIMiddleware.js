import 'isomorphic-fetch';
export default function callAPIMiddleware () {
    return next => action => {
        const { fetchAPI, types } = action;
        if (!fetchAPI) {
            return next(action);
        }
        const [ success, failure ] = types;
        return fetch(fetchAPI)
            .then(response =>response.json().then(json => ({ json, response })))
            .then(({ json, response }) => {
                if (response.status === 200) {
                    next(success(json));
                } else {
                    next(failure());
                }

            })
            .catch((err) => {
                next(failure(err));
            });
    };
}
