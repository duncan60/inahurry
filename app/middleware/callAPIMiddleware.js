export default function callAPIMiddleware (){
    return next=> action =>{
        return next(action);
    };
}
