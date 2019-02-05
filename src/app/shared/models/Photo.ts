export class Photo{
    _id:string;
    path:string;
    group:string;
    tags:string[];
    idSalle:string;
    like:number;
    interesting:number;
    fun:number;

    constructor(id:string,path:string,nbMostLiked:number,nbMostInterest:number,nbMostfun:number){
        this._id=id;
        this.path=path;
        this.fun=nbMostfun;
        this.like=nbMostLiked;
        this.interesting=nbMostInterest;
    }
}